const nodemailer = require('nodemailer');
const  path =require('path');
require('dotenv').config();
/**
 * @param {string} destinatario 
 * @param {string} asunto 
 * @param {string} cuerpo 
 * @returns {Promise<{ success: boolean, messageId?: string, error?: any }>}
 */
async function enviarCorreo(destinatario, asunto, cuerpo) {
  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Fixcel" <${process.env.EMAIL_USER}>`,

      to: destinatario,

      subject: asunto,

      text: cuerpo,

      html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    
    <!-- Sección del logo institucional -->
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="cid:logoEmpresa" alt="Logo Empresa" style="width: 120px; height: auto;"/>
    </div>

    <!-- Asunto principal mostrado como título -->
    <h2 style="color: #007BFF; text-align: center;">${asunto}</h2>

    <!-- Separador visual -->
    <hr style="border: none; border-top: 1px solid #ccc; margin: 10px 0;">

    <!-- Cuerpo del mensaje -->
    <p style="font-size: 15px; line-height: 1.5;">${cuerpo}</p>

    <!-- Otro separador visual -->
    <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">

    <!-- Firma profesional del docente -->
    <div style="text-align: center; font-size: 13px; color: #555;">
      <strong>Gente de Fixcell</strong><br><br>
      <a href="mailto:${process.env.EMAIL_USER}" style="color: #007BFF;">${process.env.EMAIL_USER}</a><br>
      <a href="https://sites.google.com/view/tecnica1montegrande/inicio" style="color: #007BFF;">www.eest1.com.ar</a>
    </div>

    <!-- Pie de correo con aviso de confidencialidad -->
    <small style="display: block; text-align: center; margin-top: 10px; color: #888;">
      📎 Este correo fue emitido por el área administración de la empresa?.<br>
      Información confidencial destinada exclusivamente a su destinatario.
    </small>
  </div>
  `,

      attachments: [
        {
          filename: 'fixcellogo.png',

          path: path.resolve(__dirname, '../img/fixcellogo.png'),

          cid: 'logoEmpresa'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado correctamente a ${destinatario} (ID: ${info.messageId})`);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { enviarCorreo };