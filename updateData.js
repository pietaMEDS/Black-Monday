const fs = require('fs');
const path = require('path');
const pars = require('./scripts/parser');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function processAllGroups() {
    try {
        await new Promise((resolve, reject) => {
            connection.query('DELETE FROM schedule', (err) => {
                if (err) {
                    return reject('Ошибка при очистке таблицы schedule: ' + err.stack);
                }
                resolve();
            });
        });

        const groupsDir = './data/groups/';

        const files = await new Promise((resolve, reject) => {
            fs.readdir(groupsDir, (err, files) => {
                if (err) {
                    return reject('Ошибка при чтении директории: ' + err);
                }
                resolve(files);
            });
        });

        for (const file of files) {
            const groupPath = path.join(groupsDir, file);
            const stats = await new Promise((resolve, reject) => {
                fs.stat(groupPath, (err, stats) => {
                    if (err) {
                        return reject('Ошибка при получении информации о файле: ' + err);
                    }
                    resolve(stats);
                });
            });

            if (stats.isDirectory()) {
                pars.parse(file);
            }
        }

        console.log('Данные успешно обновлены');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { processAllGroups };
