module.exports = {
    name: "help",
    run: async (client, message) => {
        let embed = new client.embed()
            .setAuthor(" |  HELP 😉", message.author.displayAvatarURL({dynamic:true}))
            .setDescription("`uptime`, `delete`, `total`, `list`")
            .setFooter("© | My prefix is !");
        message.channel.send({embed : embed});
    }
};