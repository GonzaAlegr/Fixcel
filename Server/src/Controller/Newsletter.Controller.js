const db = require('../DataBase/db')
const { enviarCorreo } = require('../Utils/Email');

/**
 * Controlador para registrar un nuevo suscriptor y enviarle un correo de confirmación.
 */
const SuscribirNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Debes ingresar un correo electrónico." });
  }

  // Intentar guardar el correo
  db.run(`INSERT INTO Newsletter (Email) VALUES (?)`, [email], async (err) => {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(409).json({ error: "Este correo ya está suscrito." });
      }
      console.error("❌ Error al guardar correo:", err.message);
      return res.status(500).json({ error: "Error al registrar suscripción." });
    }

    // Si se guardó bien, enviamos el correo de confirmación
    const asunto = "🎉 ¡Gracias por suscribirte a Fixcel!";
    const cuerpo = `
      ¡Hola!<br><br>
      Te damos la bienvenida a nuestro newsletter de <strong>Fixcel</strong> 💙.<br>
      A partir de ahora vas a recibir novedades, descuentos y lanzamientos exclusivos.<br><br>
      Si no solicitaste esta suscripción, simplemente ignorá este correo.
      <br>Segui a nuestra escuela en <a href="https://www.instagram.com/tecnica1mg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">Instagram!</a> </br>
      <br><br>— El equipo de Fixcell ⚙️
    `;

    try {
      const resultado = await enviarCorreo(email, asunto, cuerpo);

      if (!resultado.success) {
        console.error("❌ Error al enviar correo:", resultado.error);
        return res.status(500).json({
          error: "Suscripción guardada, pero el correo de confirmación falló.",
        });
      }

      console.log(`✅ Suscripción completa y correo enviado a ${email}`);
      res.status(200).json({
        message: "Suscripción exitosa. Revisa tu correo para confirmar.",
      });
    } catch (error) {
      console.error("❌ Error inesperado:", error.message);
      res.status(500).json({ error: "Ocurrió un error al enviar el correo." });
    }
  });
};

module.exports = { SuscribirNewsletter };