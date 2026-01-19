import "dotenv/config";

import transporter from "./config/nodemailer.js";

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Shining Prism" <fetrafaneva@gmail.com>`,
      to: "fetrafaneva@gmail.com",
      subject: "TEST EMAIL pr",
      text: "Email de test depuis Nodemailer 🚀",
    });

    console.log("✅ Email envoyé :", info.messageId);
  } catch (err) {
    console.error("❌ ERREUR EMAIL :", err);
  }
}

testEmail();
