const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
dotenv.config();

// Criar transporte de email
const transporte = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Função para enviar email
const sendEmail = async (email, subject, texto) => {
    try {
        const info = await transporte.sendMail({ // Corrigido aqui
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text: texto
        });
        console.log('Email enviado: ', info.response);
    } catch (error) {
        console.log('Erro ao enviar email: ', error);
    }
};

// Teste: Enviar email
sendEmail('fagnersilveira86@gmail.com', 'Teste', 'Teste');
