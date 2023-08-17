const XLSX = require('xlsx');

// Загрузка файла Excel
const workbook = XLSX.readFile('data/excel.xlsx');

// Получение списка листов в файле
const sheetNames = workbook.SheetNames;

// Чтение данных из первого листа
const worksheet = workbook.Sheets[sheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// Обработка данных
for (let row of jsonData) {
  for (let cell in row) {
    console.log(row[cell]);
  }
}