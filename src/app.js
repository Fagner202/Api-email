const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");

// Configuração do dotenv para variáveis de ambiente
dotenv.config();

// Configuração do transporte de email
const transporte = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // user: process.env.EMAIL_USER,
        // pass: process.env.EMAIL_PASS,

        user: 'fagnersilveira86@gmail.com',
        pass: 'cfyd tovp ayyg fsgf',
    },
});

// Inicializa o Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON e lidar com CORS
app.use(express.json());
app.use(cors());

// Rota raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo à API de envio de e-mails! Use o endpoint POST /send-email para enviar um e-mail.");
});

// Rota para enviar email
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

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
