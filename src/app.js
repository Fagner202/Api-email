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
        const info = await transporte.sendMail({
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

// Lê argumentos da linha de comando
const args = process.argv.slice(2); // Remove os dois primeiros argumentos
const email = 'fagnersilveira86@gmail.com'; // Email fixo
const subject = args[0] || 'Título Padrão'; // Primeiro argumento
const texto = args[1] || 'Texto padrão'; // Segundo argumento

// Teste: Enviar email
sendEmail(email, subject, texto);
