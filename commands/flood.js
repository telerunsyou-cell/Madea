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
