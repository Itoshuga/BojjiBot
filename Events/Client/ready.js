const { Client } = require("discord.js");
const { Database } = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log("Connected");
        client.user.setActivity("his realm", {type: "WATCHING"});

        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Database linked.");
        }).catch((err) => {
            console.log(err);
        })
    } 
}