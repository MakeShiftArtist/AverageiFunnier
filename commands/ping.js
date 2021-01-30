const methods = require("../src/methods");

module.exports = {
  name: "ping",
  brief: "Checks latency",
  cog: "misc",
  help: "Checks the round trip latency for the bot",
  aliases: ["pong"],
  execute(message) {

    message.channel.send("Pinging...").then(sent => {
      let pong = `**Roundtrip latency:** \`${sent.createdTimestamp - message.createdTimestamp}ms\``
      let embed = {
        title: "Pong! \u{0001f3d3}",
        description: pong,
        color: methods.randomColor()
      };
      sent.edit({embed: embed, content: null});
    }).catch(err => {
      message.channel.send(pong)
    })
  }
};
