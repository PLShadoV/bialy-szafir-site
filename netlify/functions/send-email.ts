import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend('re_6iHZ8ojw_E93HtfJCa4U3fQChqa4pXMqx');

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, phone, email, subject, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const { data, error } = await resend.emails.send({
      from: 'kontakt@szafirrusinowo.pl',
      to: ['info@szafirrusinowo.pl'],
      replyTo: email,
      subject: `Formularz kontaktowy: ${subject}`,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Temat:</strong> ${subject}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', id: data?.id }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};