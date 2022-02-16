const { Perms } = require("../Validation/permissions");
const { Client } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {
    const Table = new Ascii("Commandes loaded.");

    commandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);
        
        if(!command.name) {
            return Table.addRow(file.split("/")[7], "Erreur", "Nom manquant.");
        }

        if(!command.context && !command.description) {
            return Table.addRow(command.name, "Erreur", "Description manquante.");
        }

        if(!command.permission) {
            if(Perms.includes(command.permission)) {
                command.defaultPermission = false;
            } else {
                return Table.addRow(command.name, "Erreur", "Permission invalide")
            }
        }
        client.commands.set(command.name, command);
        commandsArray.push(command);

        await Table.addRow(command.name, "Succès")
    });

    console.log(Table.toString());

    // Verification des permissions

    client.on("ready", async() => {
        const mainGuild = await client.guilds.cache.get("931912144528740353");

        mainGuild.commands.set(commandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = commandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;

                return mainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }
        
            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);

                if (!roles) {
                    return accumulator;
                }

                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}];
                }, []);
                return [...accumulator, {id: r.id, permissions}];
            }, []);
            await mainGuild.commands.permissions.set({ fullPermissions });
        })
    });
}