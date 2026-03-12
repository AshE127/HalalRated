module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const response = await fetch(
      'https://api.beehiiv.com/v2/publications/pub_516d8310-4df5-407e-9681-a142b4b46732/subscriptions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer beCQZDFSlrKPLAyrLELFLZsarDKOOGtaMj8xcaeCi0JSMSIHv1DUxTQ4N3uDt20r',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'website',
          utm_medium: 'organic',
        }),
      }
    );

    const text = await response.text();
    console.log('Beehiiv status:', response.status, 'body:', text);

    if (!response.ok) {
      return res.status(response.status).json({ error: text });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
