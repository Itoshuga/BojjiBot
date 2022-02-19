const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require('superagent')

module.exports = {
    name: "hug",
    description: "Hug someone",
    permission: "SEND_MESSAGES",
    options: [
        {
            name: "target",
            description: "Target name.",
            type: "USER",
            require: false
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const { options, message } = interaction;
        const Target = options.getMember("target");

        let { body } = await superagent
            .get(`https://nekos.life/api/v2/img/hug`);         
        
        const socialInteraction = new MessageEmbed()
            .setColor(0xEDE7DF)
            .setImage(body.url)
            .setTimestamp()
            .setFooter({text: `Câlin`})

        if (Target) {
            socialInteraction.setDescription(`🤗 **${Target.displayName}** se fait câliner par **${interaction.user.username}**`);
            interaction.reply({embeds: [socialInteraction] });
        } else {
            socialInteraction.setDescription(`🤗 **${interaction.user.username}** se fait câliner par **${client.user.username}**`)
            interaction.reply({embeds: [socialInteraction] });
        }
    }
}