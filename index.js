const { Client, Collection } = require('discord.js');
const client = new Client({intents: 1});
const { token } = require('./config.json');

client.commands = new Collection();

require("./Handlers/Commands")(client);
require("./Handlers/Events")(client);

client.login(token)