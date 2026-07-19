const { 
  Client, 
  GatewayIntentBits, 
  ActivityType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setPresence({
    status: "online",
    activities: [
      {
        name: "⛔ KSRP Reports",
        type: ActivityType.Watching,
      },
    ],
  });
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get("1528483105151783043");

  if (!channel) {
    console.log("Welcome channel not found.");
    return;
  }

  const memberCount = member.guild.memberCount;

  const memberButton = new ButtonBuilder()
    .setCustomId("member_count")
    .setLabel(`${memberCount}`)
    .setEmoji("<:person:1528473741045141745>")
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

  const informationButton = new ButtonBuilder()
    .setLabel("Information ↗️")
    .setStyle(ButtonStyle.Link)
    .setURL(
      "https://discord.com/channels/1225971370681438281/1226724471348531290"
    );

  const row = new ActionRowBuilder()
    .addComponents(
      memberButton,
      informationButton
    );

  await channel.send({
    content:
      `Welcome <@${member.id}> to **Kentucky State Roleplay**. We hope you have a fantastic time here. You are member \`#${memberCount}\`.`,
    components: [row]
  });
});

client.login(process.env.TOKEN);
