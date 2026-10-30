
export default async function handler(req, res) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const APP_URL = "https://moonify-mini-app.vercel.app/";

  if (req.method === "GET") {
    if (!BOT_TOKEN) {
      return res.status(500).send("Bot token missing");
    }

    const result = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${encodeURIComponent("https://moonify-mini-app.vercel.app/api/telegram")}`
    );

    return res.status(200).json(await result.json());
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  if (!BOT_TOKEN) {
    return res.status(500).send("Bot token missing");
  }

  const message = req.body?.message;

  if (message?.text?.startsWith("/start")) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: "🌙 Welcome to Moonify!\n\nYour music, your mood. Discover and enjoy your favorite beats instantly! 🎧",
        reply_markup: {
          inline_keyboard: [[
            {
              text: "🎵 Open Moonify",
              web_app: { url: APP_URL }
            }
          ]]
        }
      })
    });
  }

  return res.status(200).json({ ok: true });
                                  }
      
