declare module 'nodemailer' {
  export interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user?: string;
      pass?: string;
    };
    requireTLS?: boolean;
    debug?: boolean;
    logger?: boolean | object;
  }

  export interface SendMailOptions {
    from?: string;
    to?: string;
    subject?: string;
    text?: string;
    html?: string;
  }

  export interface Transporter {
    sendMail(options: SendMailOptions): Promise<any>;
    verify(): Promise<true>;
  }

  export function createTransport(options: TransportOptions): Transporter;
}