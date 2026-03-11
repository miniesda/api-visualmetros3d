import https from 'https';

export default async function handler(req, res) {
  const agent = new https.Agent({ rejectUnauthorized: false });

  // Ejemplo para ver si funciona
  const url = 'https://89.140.110.107:2733/GET/estimaciones/10';

  try {
    const reqTest = https.request(url, { agent }, (response) => {
      console.log("Status code:", response.statusCode);
      res.status(200).json({ status: response.statusCode });
    });

    reqTest.on('error', (e) => {
      console.error("HTTPS Error:", e);
      res.status(500).json({ error: e.message });
    });

    reqTest.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}