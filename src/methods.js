const {robot} = require("./ifunny");
const ifunny = require("iFunny");

const randomColor = () => Math.floor(Math.random()*16777215).toString(16);

const commify = async num => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

const noEveryone = async content => {
  return content.replace(/@(everyone)/gi, "@\u200beveryone").replace(/@(here)/gi, "@\u200bhere");
};

const noMentions = async content => {
  return content.replace(/@/gi, "@\u200b");
};

const getUser = async arg => {
  var user = await ifunny.User.by_nick(arg)
  .catch(err => message.channel.send(err));

  if (user == null) {
    var user = new ifunny.User(arg, {client: robot});
  }
  return user;
}


module.exports = {
    randomColor: randomColor,
    commify: commify,
    noEveryone: noEveryone,
    noMentions: noMentions,
    getUser: getUser
}
