import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  const transporter = nodemailer.createTransport({
    host: 'cajademedidordeluz.com',  // Cambiado de mail.cajademedidordeluz.com a cajademedidordeluz.com
    port: 465,
    secure: true,
    auth: {
      user: 'Email@cajademedidordeluz.com',
      pass: 'Go_qUGab9Zk7',
    },
    tls: {
      rejectUnauthorized: false  // Para pruebas iniciales
    }
  });

  try {
    await transporter.sendMail({
      from: `"Formulario de Contacto" <Email@cajademedidordeluz.com>`,
      to: 'Email@cajademedidordeluz.com',
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje: ' + error.message },
      { status: 500 }
    );
  }
}
