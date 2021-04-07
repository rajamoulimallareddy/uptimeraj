/* eslint-disable no-unused-vars */
const check = require("is-url");
const fetch = require("node-fetch");
module.exports = {
    name: "uptime",
    run: async (client, message, args, db) => {
        let link = args[0];
        if (!link) return message.channel.send(":x: | **No link provided**");
        if (link.match(/https?:\/\/[a-z]+\.glitch\.me\/?/gi)) return message.channel.send(":x: | Sorry You  cannot uptime **glitch** projects");
        if (check(link) === false) return message.channel.send("🥲 | This One Dosen't Look Like a valid **URL**");
        let database = db.get("links");
        if (database) {
            let pog = database.map(l => l.url);
            if (pog.includes(link)) {
                message.delete().catch(err => undefined);
                return message.channel.send(":x: | Given **link** is already uptimed :>");
            }
        }
        fetch(link).then(() => {
            let data = {
                author: message.author.id,
                url: link
            };
            // eslint-disable-next-line no-unused-vars
            message.delete().catch(err => undefined);
            db.push("links", data);
            let embed = new client.embed()
                .setColor(client.color)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription("Given  **URL** is now uptimed And ")
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp();
            return message.channel.send({ embed: embed });
        }).catch(err => {
            return message.channel.send(":x: | **Error: The link is not valid**");
        });
    }
};
