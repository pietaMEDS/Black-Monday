require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.TOKEN

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const service = new VkBot(TOKEN);

const cmds = require('./commands.js');

const parser = require("./scripts/parser.js");
const { nextTick } = require('process');

const { startKeyBoard, Reference, backButton, priceBot, group } = require("./button.js")

const subData = require('./data/users/subscribe.json');
const subscribeScript = require('./scripts/subscribeScript');

const vk = new VK({
    token: TOKEN
});

let flag = false;
let changeGroup = false;

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
    flag = true;
    if(WhatUser(context)){
    context.send({ message: `Расписание какой группы вам нужно?`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Моя группа"}, color:"primary"}] ,[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline: false}) });
    }
  })
  
  bot.hear(/Моя группа/i, async(context, next) => {
    // context.send({ message: `хуй знаеть че тут писать ваще`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
    if (flag) {
      if(WhatUser(context)){
        let data = require('./data/users/subscribe.json');
        console.log(data['user_'+context.senderId].group);
      SearchGroup(context, true);
      week = parser.parse(data['user_'+context.senderId].group.toLowerCase());
      context.send({ message: `Выбери подгруппу`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Первая"}, color: "negative" }, {action:{type:"text", label:"Вторая"}, color: "negative" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
      }
      flag = false;
      }
  })

  // bot.hear(/Другая группа/i, async(context, next) => {
  //   context.send({ message: `Введите группу`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
  // })

  bot.hear(/📜Справка/i, async(context, next) => {
    context.send({ message: `О нас`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Когда был создан бот"}, color: "primary" }, {action:{type:"text", label:"Стоимость бота в месяц"}, color: "primary" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
  })

  bot.hear(/Изменить свою группу/i, async(context, next) => {
    let fs = require("fs");
    let fileName = './data/users/subscribe.json';
    let file = require('./data/users/subscribe.json');
    let userID = context.senderId;
    userInfo={
      userID,
    };
    eval("file.user_" + userID + " = userInfo;");
    fs.writeFile(fileName,JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
      console.log('Информация о '+userID+' Сброшена');
  });
    context.send("Напишите новую группу");
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
    if (flag) {
    if(WhatUser(context)){
    SearchGroup(context);
    week = parser.parse(context.text.toLowerCase());
    context.send({ message: `Выбери подгруппу`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Первая"}, color: "negative" }, {action:{type:"text", label:"Вторая"}, color: "negative" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
    }
    flag = false;
    }

    if (changeGroup) {
      if(WhatUser(context)){
      switchGroup(context);
      week = parser.parse(context.text.toLowerCase());
      context.send({ message: `Ваша группа изменена`, keyboard: startKeyBoard });
      }
      changeGroup = false;
      }
  })
  
  bot.hear(/^[а-я]{1}\d{3}/i, async(context, next) =>{
    
  })
  
  bot.hear(/Первая/i, async(context, next) => {
    if(WhatUser(context)){
    let groupName;
    context.send({ message: `Вы вернулись назад`, keyboard: startKeyBoard })
    eval('groupName = parser.parse(subData.user_' + context.senderId + '.SearchGroup.toLowerCase())');
    parser.output(context,'Первая', groupName);
    }
  })
  
  bot.hear(/Вторая/i, async(context, next) => {
    if(WhatUser(context)){
      let groupName;
      context.send({ message: `Вы вернулись назад`, keyboard: startKeyBoard })
      eval('groupName = parser.parse(subData.user_' + context.senderId + '.SearchGroup.toLowerCase())');
      parser.output(context,'Вторая', groupName);
    }
  })
  

function switchGroup (msg) {
  let data = require('./data/users/subscribe.json');
  const fs = require("fs");
  const fileName = './data/users/subscribe.json';

  eval("data.user_" + msg.senderId + ".group = msg.text")

  fs.writeFile(fileName, JSON.stringify(data, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('Тест');
    });
}

function SearchGroup (msg, mygroup) {
  let data = require('./data/users/subscribe.json');
  const fs = require("fs");
  const fileName = './data/users/subscribe.json';

  if (mygroup) {
    eval("data.user_" + msg.senderId + ".SearchGroup = data['user_'+msg.senderId].group")
  }
  else{
    eval("data.user_" + msg.senderId + ".SearchGroup = msg.text")
  }


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
