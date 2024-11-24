module.exports = {
  parseChanges: function () {
    XLSX = require("xlsx");
    workbook = XLSX.readFile("./data/changes/data.xlsx");
    sheetNames = workbook.SheetNames;
    worksheet = workbook.Sheets[sheetNames[0]];
    jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    let groupPattern = /[а-яА-Я]{0,}[-][0-9]{2,}[-][0-9]{1,}/;

    const changesObj = [];

    jsonData.forEach((row, rowkey) => {
      row.forEach((cell, cellkey) => {
        if (groupPattern.test(cell)) {
          // console.log(jsonData[rowkey+1][cellkey]);
          changesObj.push({
            name: cell,
            firstday: {
              name: jsonData[1][0],
              change: [
                jsonData[rowkey + 1][cellkey],
                jsonData[rowkey + 2][cellkey],
                jsonData[rowkey + 3][cellkey],
                jsonData[rowkey + 4][cellkey],
                jsonData[rowkey + 5][cellkey],
                jsonData[rowkey + 6][cellkey],
                jsonData[rowkey + 7][cellkey],
              ],
            },
            secondday: {
              name: jsonData[9][0],
              change: [
                jsonData[rowkey + 9][cellkey],
                jsonData[rowkey + 10][cellkey],
                jsonData[rowkey + 11][cellkey],
                jsonData[rowkey + 12][cellkey],
                jsonData[rowkey + 13][cellkey],
                jsonData[rowkey + 14][cellkey],
                jsonData[rowkey + 15][cellkey],
              ],
            },
            thirdday: {
              name: jsonData[17][0],
              change: [
                jsonData[rowkey + 17][cellkey],
                jsonData[rowkey + 18][cellkey],
                jsonData[rowkey + 19][cellkey],
                jsonData[rowkey + 20][cellkey],
                jsonData[rowkey + 21][cellkey],
                jsonData[rowkey + 22][cellkey],
                jsonData[rowkey + 23][cellkey],
              ],
            },
          });
        }
      });
    });

    return changesObj;
  },

  formatChanges: function(change){
    let result = []
    result[1] = []

    result[0] = 4;
    if (change!=undefined) {
        result[1][1] = change.trim().split(`\r\n`)[1];
        result[1][2] = change.trim().split(`\r\n`)[0].trim().slice(-4)
        // console.log(change.trim().split(`\r\n`));
        result[1][0] = change.trim().split(`\r\n`)[0].slice(0, -4).trim();

        return result;
    }
    else if(change!=undefined){
        return [[]]
    }
  }
};
