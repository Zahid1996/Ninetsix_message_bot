const TelegramBot = require("node-telegram-bot-api");

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});

console.log("Bot is running...");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "📩 স্বাগতম!\n\nআপনার মেসেজ লিখে পাঠান। আপনার পরিচয় গোপন থাকবে।"
  );
});

bot.on("message", async (msg) => {
  if (msg.text === "/start") return;

  try {
    const text = `
📩 নতুন মেসেজ

👤 Name: ${msg.from.first_name || "Unknown"}
🆔 User ID: ${msg.from.id}

💬 Message:
${msg.text || "No text"}
`;

    await bot.sendMessage(ADMIN_CHAT_ID, text);

    await bot.sendMessage(
      msg.chat.id,
      "✅ আপনার মেসেজ সফলভাবে পাঠানো হয়েছে।"
    );
  } catch (err) {
    console.error(err);
  }
});
