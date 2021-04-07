/* eslint-disable no-unused-vars */
module.exports = {
    name: "list",
    run: async (client, message, args, db) => {
        let links = db.get("links");
        if (!links) message.reply(":x: | **You dont have any URLs uptimed**");
        let arr = [];
        links.forEach(link => {
            if (link.author === message.author.id) arr.push(link);
        });
        if (arr.length === 0) return message.reply(":x: | **You dont have any URLs uptimed**");
        let pog = arr.map(arr => arr.url).join("\n");
        let embed = new client.embed()
            .setTitle("The list of URLs You have Uptimed")
            .setDescription(pog)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor("GREEN")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
        message.reply("Check Your Dm's :)");
        return message.author.send({ embed: embed }).catch(err => {
            return message.channel.send(":x: | Do I Look A Joke To you Open Keep Your Dm's Open bruh");
        });
    }
};
