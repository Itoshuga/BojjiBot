const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { connection, connections } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
    name: "status",
    description: "AEU OO AO AEU AI NAO WA !",
    permission: "ADMINISTRATOR",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
            .setColor(`AQUA`)
            .setDescription(`**Client :** En Ligne - ${client.ws.ping}ms.
            **Uptime :** <t:${parseInt(client.readyTimestamp / 1000)}:R>
            **Database :** ${switchTo(connection.readyState)}`)
        interaction.reply({embeds: [Response]});
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `Deconnecté`
        break;
        case 1 : status = `Connecté`
        break;
        case 2 : status = `Connexion`
        break;
        case 3 : status = `Deconnexion`
        break;
    }
    return status;
}