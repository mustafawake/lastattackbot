import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const app = express();
app.get("/", (req, res) => res.send("OK"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("WEB OK", PORT));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("READY", client.user.tag, client.user.id);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  console.log("MSG", msg.content);

  if (msg.content.trim() === "!ping") {
    await msg.reply("pong 🏓");
  }
});

if (!process.env.TOKEN) {
  console.log("TOKEN YOK (Render env'e TOKEN ekle)");
} else {
  client.login(process.env.TOKEN).catch((e) => console.log("LOGIN HATA", e));
}
