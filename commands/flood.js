module.exports = {
  data: {
    name: 'flood',
    description: 'Send messages with Willy emblem',
  },

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });

      // Your flood code here
      await interaction.followUp({
        content: 'Flood command started.',
        ephemeral: true
      });

    } catch (error) {
      console.error(error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'Error running command.',
          ephemeral: true
        });
      }
    }
  }
};

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam")
    .setDescription("spam for training")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Number of spammed messages (max 16)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const amount = Math.min(
      interaction.options.getInteger("amount"),
      5
    );

    await interaction.reply({
      content: "⚠️ spam activity for training...",
      ephemeral: true
    });

    for (let i = 1; i <= amount; i++) {
      await interaction.channel.send(
        `🚨 [TRAINING SPAM TEST ${i}] Example suspicious message`
      );

      // delay so it doesn't flood
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }
};
