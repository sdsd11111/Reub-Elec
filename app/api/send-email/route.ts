import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Ruta donde se guardarán los mensajes
const MESSAGES_FILE = path.join(process.cwd(), 'messages.json');

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();
  const timestamp = new Date().toISOString();
  
  try {
    // Leer mensajes existentes
    let messages = [];
    try {
      const fileContent = await fs.readFile(MESSAGES_FILE, 'utf8');
      messages = JSON.parse(fileContent);
    } catch (error) {
      // Si el archivo no existe, se creará con el primer mensaje
      console.log('Creando nuevo archivo de mensajes...');
    }
    
    // Agregar nuevo mensaje
    const newMessage = {
      id: Date.now(),
      timestamp,
      name,
      email,
      phone: phone || 'No proporcionado',
      message
    };
    
    messages.push(newMessage);
    
    // Guardar mensajes en el archivo
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    
    console.log('Mensaje guardado:', newMessage);
    
    return NextResponse.json({ 
      message: 'Mensaje recibido correctamente. ¡Gracias por contactarnos!',
      debug: 'Los mensajes se están guardando localmente mientras se soluciona el envío por correo.'
    });
    
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    return NextResponse.json(
      { 
        error: 'Error al procesar el mensaje',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
