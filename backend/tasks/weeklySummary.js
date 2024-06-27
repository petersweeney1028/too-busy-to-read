const cron = require('node-cron');
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
const Article = require('../models/Article');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

cron.schedule('0 0 * * 0', async () => {
  const users = await User.find();
  for (const user of users) {
    const articles = await Article.find({ userId: user.id, date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    const summaries = await Promise.all(articles.map(article => axios.post('https://api.openai.com/v1/completions', {
      prompt: `Summarize this article: ${article.url}`,
      max_tokens: 150
    }, { headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` } })));

    const emailContent = summaries.map((summary, index) => `
      <h2>${articles[index].title}</h2>
      <p>${summary.data.choices[0].text}</p>
    `).join('');

    const msg = {
      to: user.email,
      from: 'no-reply@toobusy.com',
      subject: 'Weekly Article Summaries',
      html: `<h1>Weekly Article Summaries</h1>${emailContent}`,
    };

    sgMail.send(msg);
  }
});
