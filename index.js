const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.GuildPresences, Discord.GatewayIntentBits.GuildVoiceStates, Discord.GatewayIntentBits.DirectMessages, Discord.GatewayIntentBits.GuildMessageReactions, Discord.GatewayIntentBits.GuildEmojisAndStickers, Discord.GatewayIntentBits.GuildInvites],
  partials: [Discord.Partials.Channel, Discord.Partials.Message, Discord.Partials.User, Discord.Partials.GuildMember, Discord.Partials.Reaction, Discord.Partials.ThreadMember, Discord.Partials.GuildScheduledEvent]
});
const config = require('./config.json');
client.login(config.token);

client.on('ready', async () => {

    console.log(`[!] — Logged in as ${client.user.tag} (${client.user.id})`);

    setInterval(async () => {
        config.pfp.map(async (id) => {
            const channel = client.channels.cache.get(id);
            if (!channel) return;

            try {
                const members = await channel.guild.members.fetch();
                const randomMember = members.filter(m => !m.user.bot).random().user;

            const embed = new Discord.EmbedBuilder()
                .setTitle('`🦅` ▸ Random Pfp')
                .setAuthor({ name: randomMember.username, iconURL: randomMember.displayAvatarURL({ dynamic: true }) })
                .setImage(randomMember.displayAvatarURL({ dynamic: true, size: 4096 }))
                .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setColor(config.color)
                .setTimestamp();

                const button = new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Link)
                .setLabel(' ▸ Link')
                .setURL(randomMember.displayAvatarURL({ dynamic: true, size: 4096 }));

            const row = new Discord.ActionRowBuilder().addComponents(button);
            return channel.send({ embeds: [embed], components: [row] });
        } catch {}
        });
    }, parseInt(config.time))

    setInterval(async () => {
        config.banner.map(async (id) => {
            const channel = client.channels.cache.get(id);
            if (!channel) return;

            try {
                const members = await channel.guild.members.fetch();
                const randomMember = members.filter(m => !m.user.bot).random().user;
                await randomMember.fetch();
                if (!randomMember.bannerURL()) return;

            const embed = new Discord.EmbedBuilder()
                .setTitle('`🦅` ▸ Random Banner')
                .setAuthor({ name: randomMember.username, iconURL: randomMember.displayAvatarURL({ dynamic: true }) })
                .setImage(randomMember.bannerURL({ dynamic: true, size: 4096 }))
                .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setColor(config.color)
                .setTimestamp();

                const button = new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Link)
                .setLabel(' ▸ Link')
                .setURL(randomMember.bannerURL({ dynamic: true, size: 4096 }));

            const row = new Discord.ActionRowBuilder().addComponents(button);
            return channel.send({ embeds: [embed], components: [row] });
        } catch {}
        });
    }, parseInt(config.time2))
});