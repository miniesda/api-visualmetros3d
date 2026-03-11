import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing stop id" });
  }

  try {
    const url = `https://89.140.110.107:2733/GET/estimaciones/${id}`;

    const response = await axios.get(url, {
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      timeout: 10000
    });

    const data = await response.json();

    const text = await response.text();
    console.log("Respuesta remota:", text);

    return res.status(200).json(data);

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      error: "Proxy error",
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
  }
}
