import axios from 'axios';

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Use POST!');
  if (process.env.SECRET_KEY && req.headers['secret-key'] !== process.env.SECRET_KEY) {
    return res.status(403).send('Wrong key!');
  }
  try {
    await axios.post(process.env.DISCORD_WEBHOOK, req.body);
    res.status(200).send('Success!');
  } catch (error) {
    res.status(500).send('Error sending to Discord!');
  }
};
