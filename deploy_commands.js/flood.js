const message = interaction.options.getString("message");
const count = interaction.options.getInteger("count") || 1;

// ✅ SAFE CHANNEL FETCH
const channel = interaction.channel 
  || await interaction.client.channels.fetch(interaction.channelId);

if (!channel) {
  return interaction.reply({
    content: "Cannot access this channel.",
    flags: 64
  });
}

// ✅ SAFE SEND LOOP
for (let i = 0; i < count; i++) {
  await channel.send(message);
}

return interaction.reply({
  content: `Sent ${count} messages!`,
  flags: 64
});
