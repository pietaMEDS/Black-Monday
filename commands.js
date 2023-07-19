const data = require('./data.json');

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const parser = require("./parser.js");

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
    console.log('"' + context.text + '"' +' by ' + context.senderId.toString());
    textToArray(context);
	return next();
});

function textToArray(msg){
    let textArray = msg.text.split(' ');
    findCommand(textArray, msg)
}

function findCommand(textarr, msg){       

  if (msg.text.split('-').length == 3) {
    let week = parser.parse(msg.text.toLowerCase());
    parser.output(msg,'Первая', week);
  }       

  let cmd = textarr[0];     
    switch (cmd.toLowerCase()) {      
        case 'привет':
          hello(msg);
          break;

        case 'start':
        case 'назад': 
        case 'кабинет': 
        case 'преподователь':
        case 'расписание':
        case 'справка':
        case 'когда был создан бот':
          console.log('%ccall: Button ' + cmd + " by " + msg.senderId, 'color:green');
          break;
        
        case 'stoprequest':
          stoprequest();
          break;

          case 'test':
            if(textarr[1].toLowerCase() == 'нечетная' || textarr[1].toLowerCase() == 'чётная' || textarr[1].toLowerCase() == 'четная' || textarr[1].toLowerCase() == 'нечётная'){
              test(textarr[1].toLowerCase(),msg);
            } else{
            msg.send('Введите чётность недели. Пример "test Чётная"');
            }
            break;

        default:
          console.log(cmd.toLowerCase())
          console.log('%cWarning: Команда не найдена', 'color:orange');
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

  async function test(week,msg){ // week должно принять одно из значений "нечетная" или "четная" в другом случае, работать не будет
    let work = parser.parse(week);
    await work;
    console.log(work);
  }

  function stoprequest(){
    console.log('%cPROCESS STOPED', 'color:red')
    err = true;
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

