const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const transporte = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.get("/", (req, res) => {
  res.send("Bem-vindo à API de envio de e-mails! Use o endpoint POST /api/send-email.");
});

app.post("/send-email", async (req, res) => {
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);

    const { subject, text } = req.body;
    const email = "fagnersilveira86@gmail.com"; // Email fixo

    if (!subject || !text) {
        return res.status(400).json({ error: "Os campos 'subject' e 'text' são obrigatórios." });
    }

    try {
        const info = await transporte.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text,
        });
        console.log("Email enviado: ", info.response);
        res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar email: ", error);
        res.status(500).json({ error: "Erro ao enviar email.", details: error.message });
    }
});

module.exports = app;
