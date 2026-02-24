export default async function handler(req, res) {
  // CORS headers (set first)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing stop id" });
  }

  try {
    const tibUrl = `https://www.tib.org/o/manager/stop-code/${id}/departures/ctmr4`;

    const response = await fetch(tibUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0" // sometimes needed if API blocks bots
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Upstream error" });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch TIB data" });
  }
}