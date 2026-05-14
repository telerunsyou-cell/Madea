const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam")
    .setDescription("Spam For Test"),

  async execute(interaction) {
    await interaction.reply({
      content: "Spam running (Danger mode)",
      ephemeral: true,
    });
  },
};
