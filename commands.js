const { VK, Keyboard, keyboardBuilder, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const service = new VkBot('vk1.a.R02T_0UFLYce8ahpwPKlwHGBHQvfWCLzWL2wPxvOTL5NzBGGBkKmR_z4oLaOZ4io4T0_1Wxt_PfYYJXZ_LnKpZ0Fzt2JHktQbDqpXZM8PFsDlhK7Y8MDdqVzXSlmTU77FAs0zY9HXV86vSfy1gixQrBh0fYSUS0tXl-p4hRFYBcpTZTehtYMUrLRo1xQBBMiha4uAYu8CsEyAvOCSJsNoQ');

const cmds = require('./commands.js');

const vk = new VK({
    token: 'vk1.a.R02T_0UFLYce8ahpwPKlwHGBHQvfWCLzWL2wPxvOTL5NzBGGBkKmR_z4oLaOZ4io4T0_1Wxt_PfYYJXZ_LnKpZ0Fzt2JHktQbDqpXZM8PFsDlhK7Y8MDdqVzXSlmTU77FAs0zY9HXV86vSfy1gixQrBh0fYSUS0tXl-p4hRFYBcpTZTehtYMUrLRo1xQBBMiha4uAYu8CsEyAvOCSJsNoQ'
})
const bot = new HearManager();

module.exports = {
    textToArray(msg){
        let textArray = msg.text.split(' ');
        FindCommand(textArray[0], msg)
    }
}

function FindCommand(cmd, msg) {
        switch (cmd.toLowerCase()) {
            case 'привет':
                hello(msg);
                break;

            case 'callback':
                CallBoard(msg);
                break;
        
            default:
                console.log('%cWarning: Команда не найдена', 'color:orange');
                break;
        }
}

function hello(msg) {
    msg.send('Привет, |имя| рад тебя видеть');
}


function CallBoard(msg){
	let keyboard = Keyboard
	.keyboard([[
		Keyboard.callbackButton({
			label: 'Красная кнопка',
			color: 'negative'
		}),
		Keyboard.callbackButton({
			label: 'Зеленая кнопка',
			color: 'positive'
		})
	],
	[
		Keyboard.callbackButton({
			label: 'Синяя',
			color: 'primary'
		}),
		Keyboard.callbackButton({
			label: 'Серая',
			color: 'secondary'
		})
	]])
	msg.send({ message: 'Callback клавиатура', keyboard: keyboard, random_id: getRandomId() })
}


vk.updates.on('message_event', msg => {
	vk.api.messages.send({ message: `Была нажата кнопка`, peer_id: msg.peerId, random_id: getRandomId() })
})