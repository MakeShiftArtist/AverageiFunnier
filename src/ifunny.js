const ifunny = require("iFunny");
const tokens = require("../tokens.json");
const config = require("../config.json");

const iFunny = require("iFunny");
const robot = new iFunny.Client({prefix: config.prefix});
robot.login(tokens.ifunny.bot.email, tokens.ifunny.bot.password)


module.exports = {
  robot: robot
}
