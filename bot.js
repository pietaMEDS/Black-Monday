const data = require('./data.json');

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const service = new VkBot(data.token);

const cmds = require('./commands.js');

const vk = new VK({
    token: data.token
});
const bot = new HearManager();

vk.updates.on('message_new', bot.middleware);

let wht = Keyboard.keyboard([[
  Keyboard.callbackButton({
    label: 'test1',
    payload:{
      button: 'test1'
    },
    callback_data: 'supertest'
  })
]])

let keyboard = Keyboard.keyboard([
  [
    Keyboard.callbackButton({
      label: 'Расписание',
      color: 'negative',
      payload: {
        button: 'Расписание'
      },
      callback_data: 'test'
    }),
    Keyboard.callbackButton({
      label: 'Преподаватели',
      color: 'positive',
      payload: {
        button: 'Преподаватели'
      },
      callback_data: 'test'
    })
  ],
  [
    Keyboard.callbackButton({
      label: 'Кабинет',
      color: 'primary',
      payload: {
        button: 'Кабинет'
      },
      callback_data: 'test'
    }),
    Keyboard.callbackButton({
      label: 'Справка',
      color: 'secondary',
      payload: {
        button: 'Справка'
      },
      callback_data: 'test'
    })
  ]
]).inline();

bot.hear(/tt/i, msg=>{
  msg.send('yes');
  let msginfo = msg.toJSON();
  console.log(msginfo);
  vk.api.messages.edit({
    peer_id: msginfo.peerId,
    message_id: msginfo.id,
    message: 'ОНО РАБОТАЕТ?',
    keyboard: wht,
  });
})

bot.hear(/cb/i, msg => {
  msg.send({ message: 'Callback клавиатура', keyboard: keyboard, random_id: getRandomId() });
});

function messageEnter() {
  return 'Выбран кабинет';
}

function messageEnter1() {
  return 'Справка о программе';
}

function messageEnter2() {
  return 'Выбрано расписание';
}

function messageEnter3() {
  return 'Выберите преподавателя';
}

vk.updates.on('message_event', msg => {
  const button = msg.eventPayload.button;

  let responseMessage;
  let responseKeyboard;

	if (button !== 'Назад') {
		responseKeyboard = Keyboard.keyboard([
		[
        Keyboard.callbackButton({
          label: 'Назад',
          color: 'primary',
          payload: {
            button: 'Назад'
          },
          callback_data: 'test'
        })
      ]
    ]).inline();

    if (button === 'Расписание') {
      responseMessage = messageEnter2();
    } else if (button === 'Кабинет') {
      responseMessage = messageEnter();
    } else if (button === 'Справка') {
      responseMessage = messageEnter1();
    } else {
      responseMessage = messageEnter3();
    }

    vk.api.messages.send({
      message: responseMessage,
      peer_id: msg.peerId,
      random_id: getRandomId(),
      keyboard: responseKeyboard
    });
  } else {
    responseKeyboard = keyboard;

    vk.api.messages.send({
      message: 'Callback клавиатура',
      peer_id: msg.peerId,
      random_id: getRandomId(),
      keyboard: responseKeyboard
    });
  }
});


bot.hear('stoprequest', msg=>{
	vk.updates.stop();
    service.stop();
});

async function start(){
  let work = vk.updates.start().catch(console.error);
  await work;
  console.log('Бот запущен!!');
} 

start();
