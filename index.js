require('dotenv').config();
const { Client, GatewayIntentBits, Events, REST, Routes, SlashCommandBuilder, Partials } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

// ❌ REMOVE GUILD_ID (not needed for global commands)

if (!TOKEN || !CLIENT_ID) {
  console.error("ERROR: Missing TOKEN or CLIENT_ID.");
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName("flood")
    .setDescription("Send messages with Willy emblem")
    .addStringOption(o =>
      o.setName("message")
        .setDescription("Message to send")
        .setRequired(true)
    )
    .addIntegerOption(o =>
      o.setName("count")
        .setDescription("Number of times to send (1-16)")
        .setMinValue(1)
        .setMaxValue(16)
    ),

  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if bot is alive")

].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registering GLOBAL commands...");

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("Global commands registered!");
  } catch (err) {
    console.error("Command registration failed:");
    console.error(err);
  }
})();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, () => {
  console.log("Bot is online as " + client.user.tag);
});

client.login(TOKEN).catch(err => {
  console.error("Login failed:", err);
  process.exit(1);
});
