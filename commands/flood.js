const { MessageFlags } = require("discord.js");

module.exports = {
  name: "flood",

  async execute(interaction) {
    const message = interaction.options.getString("message");
    const count = interaction.options.getInteger("count") || 1;

    // Reply first so interaction doesn't fail
    await interaction.reply({
      content: "Sending messages...",
      flags: MessageFlags.Ephemeral
    });

    try {
      for (let i = 0; i < count; i++) {
        await interaction.channel.send(`${message} [Willy]`);
      }
    } catch (err) {
      console.error("Flood command error:", err);

      await interaction.followUp({
        content: "Could not send messages. Check bot permissions.",
        flags: MessageFlags.Ephemeral
      });
    }
  }
};
