const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const accountSid = 'AC28561cecff148a7cb383d7634ff42959';
const authToken = '6e1c7f8ba88cbcd21cfd958f2fe04e59';
const client = new twilio(accountSid, authToken);


app.post('/send-sms', async (req, res) => {
  const { orderData, adminPhoneNumber } = req.body;

  try {
    const message = await client.messages.create({
      body: `New order received: ${JSON.stringify(orderData)}`,
      to: adminPhoneNumber,
      from: 'whatsapp:+14155238886',
    });

    res.status(200).send({ message: 'SMS sent successfully', data: message });
  } catch (error) {
    res.status(500).send({ error: 'Error sending SMS', details: error });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});