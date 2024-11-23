let user;
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.TOKEN

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const scripts = {
  parser: require("./scripts/parser.js"),
  subscribe: require("./scripts/subscribeScript.js")
}

const service = new VkBot(TOKEN);

const vk = new VK({
    token: TOKEN
})

const bot = new HearManager();

vk.updates.on('message_new', (context, next) => {
	const { messagePayload } = context;
	context.state.command = messagePayload && messagePayload.command
		? messagePayload.command
		: null;
    // console.log('"' + context.text + '"' +' by ' + context.senderId.toString());
    if (scripts.subscribe.checkUser(context)){
      textToArray(context);
      return next();
    }
});

function textToArray(msg){
    let textArray = msg.text.split(' ');
    findCommand(textArray, msg)
}

function findCommand(textarr, msg){        

  let cmd = textarr[0];     
    switch (cmd.toLowerCase()) {      
        case 'привет':
          hello(msg);
          break;
        
        case 'Первая':
        case 'Вторая':
        case 'start':
        case 'назад': 
        case '🚪кабинет': 
        case '🎓преподователь':
        case '📅расписание':
        case '📜справка':
        case 'когда был создан бот':
          console.log('%ccall: Button ' + cmd + " by " + msg.senderId, 'color:green');
          break;
        
        case 'stoprequest':
          stoprequest();
          break;

        default:
          console.log('%cWarning: Команда '+cmd.toLowerCase()+' не найдена \nПолная комманда "'+msg.text+'" от '+ msg.senderId, 'color:orange');
          break;
    }
}

function hello(msg){
    msg.send('hi');
}

service.startPolling((err) => {
    if (err) {
      console.error(err);
    }
  });

  function stoprequest(){
    console.log('%cPROCESS STOPED', 'color:red')
    vk.updates.stop();
    service.stop();
  }

  async function start(){
    let workb = service.startPolling((err) => {
      if (err) {
        console.error('Service Error : ' + err);
      }
    });
    let works = vk.updates.start().catch(console.error);
    await workb & works;
    console.log('Сервис запущен!!');
    return workb, works
  } ;

  start();

