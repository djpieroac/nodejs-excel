const path = require('path')
const readXlsxFile = require('read-excel-file/node')

// File path. PNATURAL_20231211_CONCAMBIO_01   PNATURAL_20231211_CONCAMBIO_31
const fileName = path.join(__dirname, '/files/PNATURAL_20231211_CONCAMBIO_31.csv');

console.log(fileName);

const bootstrap = async () => {
    readXlsxFile(fileName)
        .then((rows) => {
            console.log(JSON.stringify(rows, null, 2));
        })
}

bootstrap()