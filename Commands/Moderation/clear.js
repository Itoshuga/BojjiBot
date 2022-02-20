const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Supprimer",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Nombre de message à supprimer.",
            type: "NUMBER",
            require: true
        },
        {
            name: "target",
            description: "Cible les messages d'une personne",
            type: "USER",
            require: false
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor("BLUE");

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages). filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`${messages.size} message(s) de ${Target} ont été supprimés.`);
                interaction.reply({embeds: [Response]});
            }).then(() => {
                setTimeout(() => {channel.bulkDelete(1, true);
                }, 2000)
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`${messages.size} message(s) du salon ont été supprimés.`);
                interaction.reply({embeds: [Response]});
            }).then(() => {
                setTimeout(() => {channel.bulkDelete(1, true);
                }, 2000)
            })
        }
    }
}