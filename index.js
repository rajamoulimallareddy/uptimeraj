console.clear();
console.log("[INFO]: Loading...");
console.log("-------------------------------------");
const Client = require("./Structures/AquaClient.js");
const Discord = require("discord.js");
require("./Structures/Message.js");
const { prefix, token } = require("./config.json");
const client = new Client({
    disableMentions: "everyone"
});
const fetch = require("node-fetch");
const db = require("quick.db");
client.loadCommands(client);
console.log("-------------------------------------");

client.on("ready", () => {
    console.log(`[INFO]: Ready on client (${client.user.tag})`);
    console.log(`[INFO]: watching ${client.guilds.cache.size} Servers, ${client.channels.cache.size} channels & ${client.users.cache.size} users`);
    console.log("-------------------------------------");
    client.user.setActivity("Up me ", {
        type: "WATCHING"
    });
});

setInterval(() => {
    let links = db.get("links");
    if (!links) return;
    let bruh = links.map(link => link.url);
    bruh.forEach(link => {
        try {
            fetch(link);
        } catch (err) {
            return;
        }
    });
}, 60000);

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args, db);
});

client.login(token).catch(err => {
    console.log("[ERROR]: Invalid Token Provided");
});