import nodemailer, { Transporter } from 'nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER, // Ensure this environment variable is set
    pass: process.env.ETHEREAL_PASS // Ensure this environment variable is set
  }
});

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> => {
  const mailOptions: MailOptions = {
    from: process.env.EMAIL_USER || process.env.ETHEREAL_USER || '',
    to,
    subject,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
