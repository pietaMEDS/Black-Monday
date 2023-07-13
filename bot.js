const data = require('./data.json');

// Далее можно использовать переменную `data` для доступа к данным из файла JSON
console.log(data);

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const service = new VkBot('vk1.a.R02T_0UFLYce8ahpwPKlwHGBHQvfWCLzWL2wPxvOTL5NzBGGBkKmR_z4oLaOZ4io4T0_1Wxt_PfYYJXZ_LnKpZ0Fzt2JHktQbDqpXZM8PFsDlhK7Y8MDdqVzXSlmTU77FAs0zY9HXV86vSfy1gixQrBh0fYSUS0tXl-p4hRFYBcpTZTehtYMUrLRo1xQBBMiha4uAYu8CsEyAvOCSJsNoQ');

const cmds = require('./commands.js');

const vk = new VK({
    token: 'vk1.a.R02T_0UFLYce8ahpwPKlwHGBHQvfWCLzWL2wPxvOTL5NzBGGBkKmR_z4oLaOZ4io4T0_1Wxt_PfYYJXZ_LnKpZ0Fzt2JHktQbDqpXZM8PFsDlhK7Y8MDdqVzXSlmTU77FAs0zY9HXV86vSfy1gixQrBh0fYSUS0tXl-p4hRFYBcpTZTehtYMUrLRo1xQBBMiha4uAYu8CsEyAvOCSJsNoQ'
})
const bot = new HearManager();

vk.updates.on('message_new', bot.middleware);

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

service.startPolling((err) => {
    if (err) {
      console.error(err);
    }
  });
vk.updates.start().catch(console.error);



console.log('Бот запущен!!');