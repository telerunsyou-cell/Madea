const {
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flood")
    .setDescription("Send multiple test messages")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("How many messages to send (1-16)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(16)
    )
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Message to send")
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel to send messages in")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    ),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    const message = interaction.options.getString("message");
    const targetChannel =
      interaction.options.getChannel("channel") ||
      interaction.channel;

    await interaction.reply({
      content: `Sending ${amount} messages in ${targetChannel}...`,
      ephemeral: true,
    });

    for (let i = 0; i < amount; i++) {
      await targetChannel.send(message);
    }
  },
};
