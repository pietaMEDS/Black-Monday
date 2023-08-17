let user;
const data = require('./data.json');

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const scripts = {
  parser: require("./scripts/parser.js"),
  subscribe: require("./scripts/subscribeScript.js")
}

const service = new VkBot(data.token);

const vk = new VK({
    token: 'vk1.a.R02T_0UFLYce8ahpwPKlwHGBHQvfWCLzWL2wPxvOTL5NzBGGBkKmR_z4oLaOZ4io4T0_1Wxt_PfYYJXZ_LnKpZ0Fzt2JHktQbDqpXZM8PFsDlhK7Y8MDdqVzXSlmTU77FAs0zY9HXV86vSfy1gixQrBh0fYSUS0tXl-p4hRFYBcpTZTehtYMUrLRo1xQBBMiha4uAYu8CsEyAvOCSJsNoQ'
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

