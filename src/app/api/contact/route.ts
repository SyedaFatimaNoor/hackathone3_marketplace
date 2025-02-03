import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  // Enable CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS request for CORS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  try {
    // Parse request body
    const data: ContactFormData = await request.json();
    const { name, email, message } = data;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'All fields are required' }, 
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' }, 
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    // Detailed logging of environment variables
    console.log('Gmail User:', process.env.GMAIL_USER ? 'Set' : 'Not Set');
    console.log('Gmail App Password:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not Set');

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: `"Contact Form" <${process.env.GMAIL_USER}>`,
      to: 'syedanoor610@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email
    };

    // Send email with detailed error handling
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info);

      return NextResponse.json(
        { message: 'Message sent successfully' }, 
        { 
          status: 200,
          headers: corsHeaders 
        }
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return NextResponse.json(
        { 
          message: 'Failed to send email', 
          error: String(emailError) 
        }, 
        { 
          status: 500,
          headers: corsHeaders 
        }
      );
    }
  } catch (error) {
    // Catch any unexpected errors during processing
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { 
        message: 'Error processing your request', 
        error: String(error) 
      }, 
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}