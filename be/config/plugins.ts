export default ({ env }) => ({
  "users-permissions": {
    config: {
      advanced: {
        email_confirmation: true,
        unique_email: true,
        default_role: "authenticated",
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_USER"),
        defaultReplyTo: env("SMTP_USER"),
      },
    },
  },
});
