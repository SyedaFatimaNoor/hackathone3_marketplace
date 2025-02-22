import { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us - Avion',
  description: 'Get in touch with us. We\'d love to hear from you!',
  keywords: ['contact', 'support', 'reach out'],
  openGraph: {
    title: 'Contact Us',
    description: 'Connect with our team',
    type: 'website',
  }
};

export default function ContactPage() {
  return <ContactClient />;
}