
module.exports = {
    checkUser: function(msg, username){
        let data = require('../data/users/subscribe.json');
        if (data["user_"+msg.senderId] == undefined){
            msg.send("Вы новый пользователь? Прекрасно! сейчас настроюсь под вас.");
            Register(msg,0,username);
            msg.send("Какая ваша группа?");
            return false;
        }
        else if(data["user_"+msg.senderId].group == undefined){
            Register(msg,1);
            return false;
        }
        else if(data["user_"+msg.senderId].subscribe == undefined){
            Register(msg,2);
            return false;
        }
        else if(data["user_"+msg.senderId].subscribe == false){
            msg.send("Вы не можете пользоваться ботом");
            return false;
        }
        else{
            return true;
        }

        async function Register(msg,status,username){ 
            // msg - Сообщение пользователя
            // status - Статус записи данных (таблица ниже)
            // 0 - Нет данных о пользователе
            // 1 - Требуеться Группа пользователя
            // 2 - Подтверждение Группы
            const fs = require("fs");
            const fileName = './data/users/subscribe.json';
            const file = require('../data/users/subscribe.json');
            let userID = msg.senderId;
            let userInfo ={};

            switch (status){
                case 0:
                    userInfo={
                        userID,
                        username
                    };
                    eval("file.user_" + userID + " = userInfo;");
                    // file.user=userInfo;
                    fs.writeFile(fileName,JSON.stringify(file, null, 2), function writeJSON(err) {
                        if (err) return console.log(err);
                        console.log('Информация о '+userID+' загружаеться |17%|');
                    });
                break;
                case 1:
                    userInfo = msg.text
                    
                    eval("file.user_" + userID + ".group = userInfo;");
                    fs.writeFile(fileName,JSON.stringify(file, null, 2), function writeJSON(err) {
                        if (err) return console.log(err);
                        console.log('Информация о '+userID+' загружаеться |30%|');
                    });
                    msg.send("Вы уверенны что ваша группа '"+msg.text+"'?");
                break;
                case 2:
                    if(msg.text.toLowerCase() != "да"){
                        userInfo={
                            userID
                        };
                        eval("file.user_" + userID + " = userInfo;");
                        fs.writeFile(fileName,JSON.stringify(file, null, 2), function writeJSON(err) {
                        if (err) return console.log(err);
                        console.log('Информация о '+userID+' ОТгружаеться |17%|');
                        });
                        msg.send("Какая ваша группа?");
                        }
                    else{
                        
                        eval("file.user_" + userID + ".subscribe = true;");
                        eval("file.user_" + userID + ".LastNonCommands = msg.text");
                        eval("file.user_" + userID + ".SearchGroup = file.user_" + userID + ".group;");
                        fs.writeFile(fileName,JSON.stringify(file, null, 2), function writeJSON(err) {
                        if (err) return console.log(err);

                        console.log('Информация о '+userID+' загружено |100%|');
                        msg.send("Чтобы начать напишите start, Это будет первый и последний раз!")
                    });
                    }
                break;
            }
        }
    }
}