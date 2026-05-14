require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

// ✅ Create client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// ✅ Command collection
client.commands = new Collection();

/*
  TEMP TEST COMMAND (so your bot works immediately)
  You can replace this later with a folder system
*/
client.commands.set("ping", {
  execute: async (interaction) => {
    await interaction.reply("Pong 🏓");
  },
});

// ✅ Interaction handler
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

// ✅ Bot ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// ✅ Login
client.login(process.env.TOKEN);
