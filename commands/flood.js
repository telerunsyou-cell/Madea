const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flood")
    .setDescription("flood attack (testing only)"),

  async execute(interaction) {
    await interaction.reply({
      content: "Flood started",
      ephemeral: true,
    });
  },
};
