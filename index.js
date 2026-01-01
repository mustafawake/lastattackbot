import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log("🤖 Bot Discord'a bağlandı!");
});

client.on("messageCreate", (message) => {
  console.log("Mesaj geldi:", message.content);

  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("pong 🏓");
  }
});

// 🔑 TOKEN
client.login(process.env.TOKEN);

// 🌐 WEB SERVER (Render için)
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot çalışıyor kanka 🚀");
});

app.listen(PORT, () => {
  console.log("Web server açık:", PORT);
});
