import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { promises as fs } from 'fs';
import path from 'path';

// Ruta donde se guardarán los mensajes como respaldo
const MESSAGES_FILE = path.join(process.cwd(), 'messages.json');

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();
  const timestamp = new Date().toISOString();

  // 1. Guardar localmente como respaldo
  try {
    let messages = [];
    try {
      const fileContent = await fs.readFile(MESSAGES_FILE, 'utf8');
      messages = JSON.parse(fileContent);
    } catch (error) {
      // Si el archivo no existe, se creará con el primer mensaje
    }

    const newMessage = {
      id: Date.now(),
      timestamp,
      name,
      email,
      phone: phone || 'No proporcionado',
      message
    };

    messages.push(newMessage);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (backupError) {
    console.error('Error al guardar respaldo local:', backupError);
  }

  // 2. Enviar por correo electrónico
  try {
    // Configuración del transportador
    // Nota: Usamos mail.cajademedidordeluz.com como host predeterminado para dominios personalizados
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'mail.cajademedidordeluz.com',
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true, // true para puerto 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Reubí Elec Contacto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nuevo mensaje de contacto: ${name}`,
      text: `
        Has recibido un nuevo mensaje desde el sitio web:
        
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone || 'No proporcionado'}
        Mensaje: ${message}
        
        Fecha: ${timestamp}
      `,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Enviado el: ${timestamp}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
    });

  } catch (emailError: any) {
    console.error('Error al enviar email:', emailError);
    return NextResponse.json(
      {
        error: 'Error al enviar el mensaje por correo',
        details: emailError.message
      },
      { status: 500 }
    );
  }
}
