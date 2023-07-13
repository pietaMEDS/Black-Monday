const data = require('./data.json');
const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');


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
    findCommand(textArray[0], msg)
}

function findCommand(cmd, msg){
    switch (cmd.toLowerCase()) {
        case 'привет':
          hello(msg);
          break;

        case 'cb':
          console.log('%ccall: CallBackButton', 'color:green')

        case 'stoprequest':
          stoprequest();
          break;

        default:
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

  function stoprequest(){
    vk.updates.stop();
    service.stop();
  }

  async function start(){
    let work = service.startPolling((err) => {
      if (err) {
        console.error(err);
      }
    });
    await work;
    console.log('Сервис запущен!!');
  } ;

  start()

