module.exports = {
  name: "flood",

  async execute(interaction) {
    const message = interaction.options.getString("message");
    const count = interaction.options.getInteger("count") || 1;

    await interaction.reply({
      content: "Sending messages...",
      ephemeral: true
    });

    for (let i = 0; i < count; i++) {
      await interaction.channel.send(`${message} [Willy]`);
    }
  }
};
