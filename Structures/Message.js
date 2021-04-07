const { Structures, APIMessage } = require("discord.js");
module.exports = Structures.extend(
    "Message",
    (Message) =>
        class message extends Message {
            constructor(...args) {
                super(...args);
            }
            async reply(content, options) {
                const reference = {
                    message_id:
            (!!content && !options
                ? typeof content === "object" && content.messageID
                : options && options.messageID) || this.id,
                    message_channel: this.channel.id,
                };
                if(message.content === `<@${799196603444363275}>` || message.content === `<@!${799196603444363275}>`){
                    message.channel.send("your message here");}

                const { data: parsed, files } = await APIMessage.create(
                    this,
                    content,
                    options
                )
                    .resolveData()
                    .resolveFiles();

                this.client.api.channels[this.channel.id].messages.post({
                    data: { ...parsed, message_reference: reference },
                    files,
                });
            }
        }
); 
