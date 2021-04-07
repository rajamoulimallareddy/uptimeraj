module.exports = {
    name: "total",
    run: async (client, message, args, db) => {
        let links = db.get("links");
        if (!links) links = [];
        let total = links.length;
        return message.reply(`You Have a total of ${total} links. Peace:✌️`);
    }
};
