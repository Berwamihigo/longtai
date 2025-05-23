import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Use App Password, not your regular Gmail password
  },
});

type EmailTemplate = {
  subject: string;
  html: string;
};

const getStatusEmailTemplate = (
  customerName: string,
  carModel: string,
  serviceType: string,
  status: 'verified' | 'postponed' | 'denied',
  preferredDate: string
): EmailTemplate => {
  const statusMessages = {
    verified: {
      subject: 'Longtai Auto Rwanda - Your Maintenance Request Has Been Approved',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2F855A; margin: 0;">Longtai Auto Rwanda</h1>
            <p style="color: #4A5568; margin: 5px 0;">Your Trusted Auto Service Partner</p>
          </div>
          <h2 style="color: #2F855A;">Maintenance Request Approved</h2>
          <p>Dear ${customerName},</p>
          <p>We are pleased to inform you that your maintenance request has been approved.</p>
          <div style="background-color: #F0FFF4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Details:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li>Car Model: ${carModel}</li>
              <li>Service Type: ${serviceType}</li>
              <li>Preferred Date: ${new Date(preferredDate).toLocaleDateString()}</li>
            </ul>
          </div>
          <p>Please arrive at our service center at your scheduled time. If you need to make any changes, please contact us as soon as possible.</p>
          <p>Best regards,<br>Longtai Auto Rwanda Team</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center; color: #718096; font-size: 0.9em;">
            <p>Longtai Auto Rwanda<br>Your Trusted Auto Service Partner</p>
          </div>
        </div>
      `,
    },
    postponed: {
      subject: 'Longtai Auto Rwanda - Your Maintenance Request Has Been Postponed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #C05621; margin: 0;">Longtai Auto Rwanda</h1>
            <p style="color: #4A5568; margin: 5px 0;">Your Trusted Auto Service Partner</p>
          </div>
          <h2 style="color: #C05621;">Maintenance Request Postponed</h2>
          <p>Dear ${customerName},</p>
          <p>We regret to inform you that your maintenance request has been postponed.</p>
          <div style="background-color: #FFFAF0; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Details:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li>Car Model: ${carModel}</li>
              <li>Service Type: ${serviceType}</li>
              <li>Preferred Date: ${new Date(preferredDate).toLocaleDateString()}</li>
            </ul>
          </div>
          <p>We will contact you shortly to reschedule your appointment. We apologize for any inconvenience this may cause.</p>
          <p>Best regards,<br>Longtai Auto Rwanda Team</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center; color: #718096; font-size: 0.9em;">
            <p>Longtai Auto Rwanda<br>Your Trusted Auto Service Partner</p>
          </div>
        </div>
      `,
    },
    denied: {
      subject: 'Longtai Auto Rwanda - Your Maintenance Request Has Been Denied',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #C53030; margin: 0;">Longtai Auto Rwanda</h1>
            <p style="color: #4A5568; margin: 5px 0;">Your Trusted Auto Service Partner</p>
          </div>
          <h2 style="color: #C53030;">Maintenance Request Denied</h2>
          <p>Dear ${customerName},</p>
          <p>We regret to inform you that your maintenance request has been denied.</p>
          <div style="background-color: #FFF5F5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Details:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li>Car Model: ${carModel}</li>
              <li>Service Type: ${serviceType}</li>
              <li>Preferred Date: ${new Date(preferredDate).toLocaleDateString()}</li>
            </ul>
          </div>
          <p>Please contact us for more information about this decision. We apologize for any inconvenience.</p>
          <p>Best regards,<br>Longtai Auto Rwanda Team</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center; color: #718096; font-size: 0.9em;">
            <p>Longtai Auto Rwanda<br>Your Trusted Auto Service Partner</p>
          </div>
        </div>
      `,
    },
  };

  return statusMessages[status];
};

export const sendStatusUpdateEmail = async (
  to: string,
  customerName: string,
  carModel: string,
  serviceType: string,
  status: 'verified' | 'postponed' | 'denied',
  preferredDate: string
) => {
  try {
    const { subject, html } = getStatusEmailTemplate(
      customerName,
      carModel,
      serviceType,
      status,
      preferredDate
    );

    const mailOptions = {
      from: `"Longtai Auto Rwanda" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 