require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

// ✅ CREATE CLIENT (ONLY ONCE)
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// ✅ COMMAND COLLECTION (ONLY ONE)
client.commands = new Collection();

// ✅ LOAD COMMANDS
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// ✅ INTERACTION HANDLER
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.log(`❌ No command found: ${interaction.commandName}`);
    return;
  }

  try {
    console.log(`▶ Running command: ${interaction.commandName}`);
    await command.execute(interaction);
  } catch (error) {
    console.error("❌ Command error:", error);

    const msg = "There was an error running this command.";

    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: msg, ephemeral: true });
      } else {
        await interaction.reply({ content: msg, ephemeral: true });
      }
    } catch (err) {
      console.error("❌ Reply error:", err);
    }
  }
});

// ✅ READY EVENT
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// ✅ LOGIN
client.login(process.env.TOKEN);
