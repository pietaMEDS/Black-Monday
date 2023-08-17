const data = require('./data.json');

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const service = new VkBot(data.token);

const cmds = require('./commands.js');

const parser = require("./scripts/parser.js");
const { nextTick } = require('process');

const { startKeyBoard, Reference, backButton, priceBot, group } = require("./button.js")

const subData = require('./data/users/subscribe.json')

const vk = new VK({
    token: data.token
});
const bot = new HearManager();

let week;

vk.updates.on('message_new', bot.middleware);

    bot.hear(/start/i, async(context, next) => {
      context.send({ message: `Клавиатура`, keyboard: startKeyBoard })
  })
  
  bot.hear(/Назад/i, async(context, next) => {
    context.send({ message: `Вы вернулись назад`, keyboard: startKeyBoard })
  })
  
  bot.hear(/🚪Кабинет/i, async(context, next) => {
    if(WhatUser(context)){
    context.send({ message: `Напишите кабинет`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline: false}) });
    }
  })
  
  bot.hear(/🎓Преподователь/i, async(context, next) => {
    if(WhatUser(context)){
    context.send({ message: `Ф.И.О преподавателя`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
    }
  })
  
  bot.hear(/📅Расписание/i, async(context, next) => {
    if(WhatUser(context)){
    context.send({ message: `Напиши свою группу`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline: false}) });
    }
  })
  
  bot.hear(/📜Справка/i, async(context, next) => {
    context.send({ message: `О нас`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Когда был создан бот"}, color: "primary" }, {action:{type:"text", label:"Стоимость бота в месяц"}, color: "primary" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
  })
  
  bot.hear(/Стоимость бота в месяц/i, async(context, next) => {
    context.send({ message: `Стоимость подписки в месяц 50 рублей`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Купить"}, color: "negative" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
  })
  
  bot.hear(/Когда был создан бот/i, async(context, next) => {
    if(WhatUser(context)){
    context.send({ message: `Разработка бота началась в далеком 09.06.2023`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"},]]}) });
    }
  })
  
  bot.hear(/^[а-я]{1,5}-\d{2}-\d$/i, async(context, next) => {
    if(WhatUser(context)){
    SearchGroup(context);
    week = parser.parse(context.text.toLowerCase());
    context.send({ message: `Выбери подгруппу`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Первая"}, color: "negative" }, {action:{type:"text", label:"Вторая"}, color: "negative" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
    }
  })
  bot.hear(/^[а-я]{1}\d{3}/i, async(context, next) =>{
    console.log('accept');
  })
  
  bot.hear(/Первая/i, async(context, next) => {
    if(WhatUser(context)){
    let groupName;
    eval('groupName = parser.parse(subData.user_' + context.senderId + '.SearchGroup.toLowerCase())');
    parser.output(context,'Первая', groupName);
    }
  })
  
  bot.hear(/Вторая/i, async(context, next) => {
    if(WhatUser(context)){
      let groupName;
      eval('groupName = parser.parse(subData.user_' + context.senderId + '.SearchGroup.toLowerCase())');
      parser.output(context,'Первая', groupName);
    }
  })
  
function SearchGroup (msg) {
  let data = require('./data/users/subscribe.json');
  const fs = require("fs");
  const fileName = './data/users/subscribe.json';

  eval("data.user_" + msg.senderId + ".SearchGroup = msg.text")

  fs.writeFile(fileName, JSON.stringify(data, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('Тест');
    });
}

function WhatUser(msg){
  let data = require('./data/users/subscribe.json');
  if (data['user_'+msg.senderId] === undefined){
    return false;
  } 
  else if(data['user_'+msg.senderId].subscribe){
    return true;
  }
  else{
    return false;
  }
}

async function start(){
  let workb = service.startPolling((err) => {
    if (err) {
      console.error('BOT Error : ' + err);
    }
  });
  let works = vk.updates.start().catch(console.error);
  await workb & works;
  console.log('Бот запущен!!');
  return workb, works
}

start();