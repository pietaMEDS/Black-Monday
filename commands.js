const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const vk = new VK({
    token: 'vk1.a.R02T_0UFLYce8ahpwPKlwHGBHQvfWCLzWL2wPxvOTL5NzBGGBkKmR_z4oLaOZ4io4T0_1Wxt_PfYYJXZ_LnKpZ0Fzt2JHktQbDqpXZM8PFsDlhK7Y8MDdqVzXSlmTU77FAs0zY9HXV86vSfy1gixQrBh0fYSUS0tXl-p4hRFYBcpTZTehtYMUrLRo1xQBBMiha4uAYu8CsEyAvOCSJsNoQ'
})
const bot = new HearManager();


    function hello(msg){
        msg.send('i am working');
    }





module.exports={
    CallBoard(msg){

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
        msg.send({ message: 'Callback клавиатура', keyboard: keyboard, random_id: getRandomId() });
    }
}


vk.updates.on('message_event', msg => {
     vk.api.messages.send({ message: `Была нажата кнопка`, peer_id: msg.peerId, random_id: getRandomId() })
})