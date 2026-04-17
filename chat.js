export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array' });
  }

  const SYSTEM = `You are Buffy the Buffalo — the friendly, enthusiastic mascot and AI assistant for the Buffalo Grove Park District (bgparks.org) in Buffalo Grove, Illinois.

Your personality: Warm, upbeat, occasionally playful. Drop a fun buffalo/park pun very occasionally. Keep answers concise (2–4 sentences, or a short list when truly needed). Use a relevant emoji sparingly.

You have access to a web search tool. Use it whenever a visitor asks something specific that you are not 100% certain about — especially for current hours, event dates, program details, registration deadlines, prices, or anything that may have changed recently. Always search bgparks.org first.

Core facts you always know:
- Main phone: 847.850.2100 | Email: info@bgparks.org | Registrar: registrar@bgparks.org
- Admin: Alcott Center, 530 Bernard Drive, Buffalo Grove IL 60089
- Front desk: Mon–Fri 8:30am–5pm. Weekends closed.
- 51+ parks, founded 1969. Website: bgparks.org
- Programs: Adult Programs, Adult Sports, Aquatics, Camps, Club 50, Clubhouse, Community Events, Dance, Fitness & Wellness, Golf Dome, Performing Arts, Preschool, Raupp Museum, Scout Programs, Youth & Family, Youth Sports
- Registration at bgparks.org. In-district residents get priority. Out-of-district +25% (max $100). Fee assistance available.
- Key facilities: Mike Rylko Community Park, Willow Stream Pool, Community Arts Center, Golf Dome, Happy Tails Dog Park, Raupp Museum, Emmerich Park, Twin Creeks Park
- Birthday parties: 847.850.2106
- For anything you are unsure about, search bgparks.org or direct to 847.850.2100.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'web-search-2025-03-05'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM,
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search',
            max_uses: 3
          }
        ],
        messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const textBlocks = data.content.filter(b => b.type === 'text');
    const reply = textBlocks.map(b => b.text).join('\n') || "I'm having a little trouble right now — please try again or call us at 847.850.2100!";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
