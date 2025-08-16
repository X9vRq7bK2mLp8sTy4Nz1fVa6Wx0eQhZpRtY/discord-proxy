import axios from 'axios';

const WEBHOOKS = {
  main: process.env.MAIN_WEBHOOK,     // Your first webhook
  detector: process.env.DETECTOR_WEBHOOK  // Your second webhook
};

export default async (req, res) => {
  // Security checks
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  if (!WEBHOOKS[req.body.webhookType]) return res.status(400).send('Invalid webhook type');

  try {
    // Forward to appropriate Discord webhook
    await axios.post(WEBHOOKS[req.body.webhookType], req.body.data);
    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('Discord error: ' + error.message);
  }
};
