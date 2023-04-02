const { Client, Intents } = require("discord.js")
const client = new Client({ intents: Object.values(Intents.FLAGS) })
const config = require("./config")

client.on("ready", () => {
    console.log(`Connected as ${client.user.tag}!`)
    setInterval(() => {
        config.channels.map((id) => {
            const channel = client.channels.cache.get(id)
            const user = channel.guild.members.cache.random().user
            channel.send({
                embeds: [{
                    author: { iconURL: user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }),  name: user.tag },
                    description: `[PNG](${user.displayAvatarURL({ size: 2048, format: "png" })}) - [JPEG](${user.displayAvatarURL({ size: 2048, format: "jpeg" })}) - [JPG](${user.displayAvatarURL({ size: 2048, format: "jpg" })}) - [WEBP](${user.displayAvatarURL({ size: 2048, format: "webp" })})`,
                    footer: { text: "Made by !\"Nekros#9999" },
                    image: { url: user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) },
                    color: config.color
                }]
            })
        })
    }, config.time)
})

client.login(config.token)