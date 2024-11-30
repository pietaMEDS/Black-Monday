const fs = require('fs');
const path = require('path');
const pars = require('./scripts/parser');

function processAllGroups() {
    const groupsDir = './data/groups/';

    fs.readdir(groupsDir, (err, files) => {
        if (err) {
            console.error('Ошибка чтения директории: ' + err);
            return;
        }

        files.forEach((file) => {
            const groupPath = path.join(groupsDir, file);

            fs.stat(groupPath, (err, stats) => {
                if (err) {
                    console.error('Ошибка проверки пути: ' + err);
                    return;
                }

                if (stats.isDirectory()) {
                    console.log(`Обрабатываем группу: ${file}`);
                    pars.parse(file);
                }
            });
        });
    });
}

processAllGroups();
