const { Events } = require("../Validation/EventNames");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");

module.exports = async (client) => {
    const table = new ascii("Events Handler");

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if (!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await table.addRow(`${event.name || "Manquant"}`, `😙 Nom invalide : ${L[6] + `/` + L[7]}`);
            return;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await table.addRow(event.name, "Succès");
    });
    console.log(table.toString());
}