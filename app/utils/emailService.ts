import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Only use this in development
  },
  pool: true, // Use pooled connections
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000, // How many messages to send per second
  rateLimit: 5 // Max number of messages per rateDelta
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
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

const getTestDriveEmailTemplate = (
  customerName: string,
  carModel: string,
  status: 'approved' | 'completed' | 'cancelled',
  preferredDate: string
): EmailTemplate => {
  const statusMessages = {
    approved: {
      subject: 'Longtai Auto Rwanda - Your Test Drive Request Has Been Approved',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Drive Request Approved</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://longtai.com/logo.png" alt="Longtai Auto Rwanda" style="max-width: 200px; height: auto;">
            <h1 style="color: #2F855A; margin: 20px 0;">Test Drive Request Approved</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p>Dear ${customerName},</p>
            <p>We are pleased to inform you that your test drive request has been approved!</p>
            
            <div style="background-color: #F0FFF4; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2F855A; margin-top: 0;">Test Drive Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Car Model:</strong> ${carModel}</li>
                <li style="margin-bottom: 10px;"><strong>Test Drive Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</li>
              </ul>
            </div>
            
            <p><strong>Important Information:</strong></p>
            <ul>
              <li>Please arrive at our showroom 15 minutes before your scheduled time</li>
              <li>Bring your valid driver's license</li>
              <li>Wear comfortable clothing and shoes suitable for driving</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin-bottom: 10px;">Best regards,</p>
            <p style="font-weight: bold; color: #2F855A;">Longtai Auto Rwanda Team</p>
            <p style="font-size: 0.9em; color: #666;">
              <a href="tel:+250788888888" style="color: #2F855A; text-decoration: none;">+250 788 888 888</a><br>
              <a href="mailto:info@longtai.com" style="color: #2F855A; text-decoration: none;">info@longtai.com</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; font-size: 0.8em; color: #666;">
            <p>This email was sent to ${customerName} because you requested a test drive with Longtai Auto Rwanda.</p>
            <p>© ${new Date().getFullYear()} Longtai Auto Rwanda. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    },
    completed: {
      subject: 'Longtai Auto Rwanda - Test Drive Completed',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Drive Completed</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://longtai.com/logo.png" alt="Longtai Auto Rwanda" style="max-width: 200px; height: auto;">
            <h1 style="color: #2B6CB0; margin: 20px 0;">Test Drive Completed</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p>Dear ${customerName},</p>
            <p>Thank you for test driving the ${carModel} with us today!</p>
            
            <div style="background-color: #EBF8FF; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2B6CB0; margin-top: 0;">Test Drive Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Car Model:</strong> ${carModel}</li>
                <li style="margin-bottom: 10px;"><strong>Test Drive Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</li>
              </ul>
            </div>
            
            <p>We hope you enjoyed your experience. If you have any questions about the vehicle or would like to discuss financing options, our sales team is here to help.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin-bottom: 10px;">Best regards,</p>
            <p style="font-weight: bold; color: #2B6CB0;">Longtai Auto Rwanda Team</p>
            <p style="font-size: 0.9em; color: #666;">
              <a href="tel:+250788888888" style="color: #2B6CB0; text-decoration: none;">+250 788 888 888</a><br>
              <a href="mailto:info@longtai.com" style="color: #2B6CB0; text-decoration: none;">info@longtai.com</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; font-size: 0.8em; color: #666;">
            <p>This email was sent to ${customerName} because you completed a test drive with Longtai Auto Rwanda.</p>
            <p>© ${new Date().getFullYear()} Longtai Auto Rwanda. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    },
    cancelled: {
      subject: 'Longtai Auto Rwanda - Test Drive Request Cancelled',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Drive Request Cancelled</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://longtai.com/logo.png" alt="Longtai Auto Rwanda" style="max-width: 200px; height: auto;">
            <h1 style="color: #C53030; margin: 20px 0;">Test Drive Request Cancelled</h1>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p>Dear ${customerName},</p>
            <p>We regret to inform you that your test drive request has been cancelled.</p>
            
            <div style="background-color: #FFF5F5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #C53030; margin-top: 0;">Test Drive Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Car Model:</strong> ${carModel}</li>
                <li style="margin-bottom: 10px;"><strong>Test Drive Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</li>
              </ul>
            </div>
            
            <p>If you would like to reschedule or have any questions, please don't hesitate to contact us.</p>
            <p>We apologize for any inconvenience this may have caused.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin-bottom: 10px;">Best regards,</p>
            <p style="font-weight: bold; color: #C53030;">Longtai Auto Rwanda Team</p>
            <p style="font-size: 0.9em; color: #666;">
              <a href="tel:+250788888888" style="color: #C53030; text-decoration: none;">+250 788 888 888</a><br>
              <a href="mailto:info@longtai.com" style="color: #C53030; text-decoration: none;">info@longtai.com</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; font-size: 0.8em; color: #666;">
            <p>This email was sent to ${customerName} because you had a test drive request with Longtai Auto Rwanda.</p>
            <p>© ${new Date().getFullYear()} Longtai Auto Rwanda. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    },
  };

  return statusMessages[status];
};

export const sendTestDriveStatusEmail = async (
  to: string,
  customerName: string,
  carModel: string,
  status: 'approved' | 'completed' | 'cancelled',
  preferredDate: string
) => {
  try {
    const { subject, html } = getTestDriveEmailTemplate(
      customerName,
      carModel,
      status,
      preferredDate
    );

    const mailOptions = {
      from: {
        name: 'Longtai Auto Rwanda',
        address: process.env.EMAIL_USER || ''
      },
      to,
      subject,
      html,
      headers: {
        'X-Entity-Ref-ID': `${Date.now()}`,
        'List-Unsubscribe': `<mailto:unsubscribe@longtai.com?subject=unsubscribe>`,
        'Precedence': 'bulk',
        'X-Auto-Response-Suppress': 'OOF, AutoReply',
        'X-Mailer': 'Longtai Auto Rwanda Mailer',
        'Message-ID': `<${Date.now()}.${Math.random().toString(36).substring(2)}@longtai.com>`,
        'Date': new Date().toUTCString(),
        'MIME-Version': '1.0',
        'Content-Type': 'text/html; charset=UTF-8'
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 