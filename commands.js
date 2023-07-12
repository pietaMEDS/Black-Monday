const { VK } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const vk = new VK({
    token: 'vk1.a.DxFkZPJCOowJlvHDltPUNkrdGR2LA-gMtiqpjJiODGGpBdGsOuYpsGprBEDVIxPQ5LesYQk46_A-mYQehA0jRFaGdYyUM733GyskR_ZRhPGOh_ag2ek8qxx4byIX0-SjQJxVahr4bXHd9z2yiZ9kDejTT4gLFyq0Qp54ay2QqayyjvcsFHV_pqLbGE7ajzzIpWieVhhrRf2yH2TuoUl7DA'
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
        
            default:
                console.log('%cWarning: Команда не найдена', 'color:orange');
                break;
        }
}

function hello(msg) {
    msg.send('Привет, |имя| рад тебя видеть');
}

