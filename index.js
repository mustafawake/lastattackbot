import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ✅ Render port fix (web server)
const app = express();
app.get("/", (req, res) => res.send("Bot çalışıyor ✅"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🌐 Web server açık, port:", PORT));

// ✅ Bot hazır logu
client.once("ready", () => {
  console.log("🤖 Bot Discord'a bağlandı:", client.user.tag);
});

// ✅ Ping komutu
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    await message.reply("pong 🏓");
  }
});

// ✅ TOKEN kontrol + giriş
if (!process.env.TOKEN) {
  console.log("❌ TOKEN bulunamadı! Render Environment Variables'a TOKEN ekle.");
} else {
  client.login(process.env.TOKEN).catch((err) => {
    console.log("❌ Discord login hatası:", err);
  });
}
