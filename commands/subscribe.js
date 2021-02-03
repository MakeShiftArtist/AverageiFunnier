const {noEveryone, getUser} = require("../src/methods")
const {robot} = require("../src/ifunny")

module.exports = {
  name: "subscribe",
  aliases: ["sub"],
  brief: "Subscribes to an iFunny user",
  help: "Subscribes to an iFunny user",
  usage: "<username || id>",
  async execute(message, args) {
    if (args.length < 1) {
      return message.channel.send("I need a user to subscribe to");
    }
    let user = await getUser(args[0]);
    console.log(user)
    if (user !== null) {
      if (await user.is_subscription) {
        var embed = {
          title: `Already subbed to ${await user.nick}`
        }
      } else {
        try{
          await user.__proto__.subscribe()
        } catch (error) {
          console.log(error)
        }
        var embed = {
        title: `Subscribed to ${await user.nick}`
        }
      }
      message.channel.send({embed: embed})
      .catch(err => message.channel.send(err))
    }

  }
};
