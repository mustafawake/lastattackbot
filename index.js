import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

/* === DISCORD BOT === */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Bot aktif: ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("pong 🏓");
  }
});

client.login(process.env.TOKEN);

/* === WEB SERVER (PORT FIX) === */
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot çalışıyor ✅");
});

app.listen(PORT, () => {
  console.log("Web server açık, port:", PORT);
});
