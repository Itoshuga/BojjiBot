const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "AEU OO AO AEU AI !",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        interaction.reply({embeds: [
            new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(`Pong ! ${client.ws.ping}ms`)
        ]});
    }
}