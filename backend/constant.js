export const verification = (user, course) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Course Purchase Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .course-info {
              display: block;
              margin: 20px 0;
              font-size: 20px;
              color: #4CAF50;
              background: #e8f5e9;
              border: 1px dashed #4CAF50;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Course Purchase Confirmed</div>
          <div class="content">
              <h1> ${user.email},</h1>
              <p>Hi ${user.username},</p>
              <p>Thank you for purchasing <strong>${course.title}</strong>!</p>
              <p>We're excited to have you on board. Your course access is now active. Below are the details:</p>
              <div class="course-info">
                  ${course.title} <br>
                  <span style="font-size: 16px; color: #333;">Price: ₹${
                    course.price
                  }</span>
              </div>
              <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
              <p>Happy learning!</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Skill Hub. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

export const otpVerification = (user, otp) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #2196F3;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .otp-box {
              margin: 20px auto;
              font-size: 28px;
              font-weight: bold;
              letter-spacing: 6px;
              background: #e3f2fd;
              color: #2196F3;
              padding: 15px;
              text-align: center;
              border-radius: 6px;
              border: 2px dashed #2196F3;
              width: fit-content;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <h1>Hello ${user.username},</h1>
              <p>We received a request to verify your email address for your Skill Hub account.</p>
              <p>Please use the OTP below to complete your verification:</p>
              <div class="otp-box">${otp}</div>
              <p>This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
              <p>If you did not request this, please ignore this email or contact our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Skill Hub. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

export const resetPasswordEmail = (resetUrl) => `
  <html>
  <body style="font-family: Arial, sans-serif;">
    <h2>Password Reset Request</h2>
    <p>You requested a password reset.</p>
    <p>
      Click the link below to reset your password:
    </p>
    <a href="${resetUrl}" style="color: #4CAF50;">Reset Password</a>
    <p>If you didn’t request this, you can ignore this email.</p>
  </body>
  </html>
`;

