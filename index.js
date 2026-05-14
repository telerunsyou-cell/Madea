require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// 1. CREATE CLIENT FIRST
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// 2. COMMAND COLLECTION (IMPORTANT if you're using client.commands)
client.commands = new Map();

// 3. EVENT
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.log(`No command found: ${interaction.commandName}`);
    return;
  }

  try {
    console.log(`Running command: ${interaction.commandName}`);

    await command.execute(interaction);

  } catch (error) {
    console.error("Command error:", error);

    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error running this command.",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error running this command.",
          ephemeral: true,
        });
      }
    } catch (err) {
      console.error("Reply error:", err);
    }
  }
});

// 4. READY EVENT
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// 5. LOGIN LAST
client.login(process.env.TOKEN);
