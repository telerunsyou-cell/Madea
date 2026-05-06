if (interaction.commandName === "flood") {
  const message = interaction.options.getString("message");
  const count = interaction.options.getInteger("count") || 1;

  const embed = new EmbedBuilder()
    .setTitle("Spam Panel")
    .setDescription(
      `**Message:** ${message}\n` +
      `🔁 **Count:** ${count}`
    )
    .setColor(0xff0000);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("spam_1")
      .setLabel("Spam x1")
      .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
      .setCustomId("spam_10")
      .setLabel("Spam x10")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("spam_16")
      .setLabel("Spam x16")
      .setStyle(ButtonStyle.Success),
  );

  return interaction.reply({
    embeds: [embed],
    components: [row]
  });
}
