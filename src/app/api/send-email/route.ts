import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  // Validate environment variables
  const emailUser = process.env.SMTP_USER;
  const emailPass = process.env.SMTP_PASSWORD;
  const emailHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const emailPort = parseInt(process.env.SMTP_PORT || '465');
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.SMTP_FROM;

  if (!emailUser || !emailPass || !ownerEmail || !fromEmail) {
    console.error('Missing email configuration', {
      emailUser: !!emailUser,
      emailPass: !!emailPass,
      ownerEmail: !!ownerEmail,
      fromEmail: !!fromEmail
    });
    return NextResponse.json({ 
      success: false, 
      error: 'Email configuration is incomplete' 
    }, { status: 500 });
  }

  const { name, email, message } = await request.json();

  // Validate input
  if (!name || !email || !message) {
    return NextResponse.json({ 
      success: false, 
      error: 'Missing required fields' 
    }, { status: 400 });
  }

  // Create a transporter using more secure SMTP configuration
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: true, // Use SSL/TLS
    auth: {
      user: emailUser,
      pass: emailPass
    },
    // Add these options for better reliability
    tls: {
      rejectUnauthorized: true
    }
  });

  try {
    // Verify transporter connection
    await transporter.verify();

    // Send email
    const mailOptions = {
      from: `"Contact Form" <${fromEmail}>`,
      to: ownerEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // Send mail and get result
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.response);

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId 
    }, { status: 200 });

  } catch (error) {
    // Comprehensive error logging
    console.error('Complete email sending error:', error);
    
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json({ 
      success: false, 
      error: errorMessage 
    }, { status: 500 });
  }
}