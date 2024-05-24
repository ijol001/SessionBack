// captchaConfig.js

const { RecaptchaMiddleware } = require('express-recaptcha');

const captchaMiddleware = new RecaptchaMiddleware({
  site_key: 'YOUR_SITE_KEY', // Replace with your reCAPTCHA site key
  secret_key: 'YOUR_SECRET_KEY', // Replace with your reCAPTCHA secret key
});

module.exports = captchaMiddleware;
