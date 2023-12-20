const path = require('path')
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
const {stringify} = require('csv-stringify');

const columns = [
    "Cliente SAP Id",
    "FirstName",
    "LastName",
    "Type",
    "Type (Desc)",
    "Tipo de Documento",
    "Tipo de Documento (Desc)",
    "Nro. de Documento",
    "Estado Civil",
    "Estado Civil (Desc)",
    "Sexo",
    "Sexo (Desc)",
    "Fecha de Nacimiento",
    "Nacionalidad",
    "Nacionalidad (Desc)",
    "Tratamiento",
    "Tratamiento (Desc)",
    "Telefono Casa",
    "Telefono Oficina",
    "Telefono Celular",
    "EmailAddress",
    "Tipo de relacion",
    "Tipo de relacion (Desc)",
    "JobTitle",
    "JobTitle (Desc)",
    "ID Persona Juridica SAP",
    "FLAG",
];


const STATUS_RESPONSE = {
    OK: 'Existe cabezera del csv',
    ERROR: 'No existe cabezera del csv'
}

const dirName = 'files' // editar por el nobre de tu carpeta nueva
const pathBase = path.join(__dirname, `/${dirName}`);

const CREATE_STATUS_RESPONSE = {
    OK: 'Csv creado',
    ERROR: 'Error al crear el csv'
}

const dirNameDestination = 'filesWithHeader'
const pathBaseDestination = path.join(__dirname, `/${dirNameDestination}`);

const readCsv = (fileName) => new Promise((resolver) => {
    const pathName = path.join(pathBase, `/${fileName}`);

    let inputStream = Fs.createReadStream(pathName, 'utf8');

    inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter: ';' }))
        .on('data', function (row) {
            const [firstColumn] = columns;
            const [firstColumnRow] = row;

            if (String(firstColumn) === String(firstColumnRow)) {
                resolver(STATUS_RESPONSE.OK);
            } else {
                resolver(STATUS_RESPONSE.ERROR);
            }
        })
        .on('end', function () {
            resolver(STATUS_RESPONSE.ERROR);
        });
})

const addHeadertoCsv = (fileName) => new Promise((resolver) => {
    const pathName = path.join(pathBase, `/${fileName}`);
    const pathNameWrite = path.join(pathBaseDestination, `/${fileName}`);

    let inputStream = Fs.createReadStream(pathName, 'utf8');

    let rows = []

    rows.push(columns);

    inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter: ';' }))
        .on('data', function (row) {
            rows.push(row);
        })
        .on('end', function () {
            const options = {
                delimiter: ';'
            };

            stringify(
                rows, 
                options,
                function (err, output) {
                    Fs.writeFile(pathNameWrite, output, 'utf8', function (err) {
                        if (err) {
                            console.log(err);
                            resolver(CREATE_STATUS_RESPONSE.ERROR)
                        } else {
                            resolver(CREATE_STATUS_RESPONSE.OK)
                        }
                    });
                });
        });
})

const bootstrap = async () => {
    // const files = ["PNATURAL_20231211_CONCAMBIO_18.csv"];
    const files = Fs.readdirSync(pathBase);
    console.log('1. Cantidad de archivos encontrados en el directorio:', files.length);

    const filesToEdit = [];
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const response = await readCsv(file);
        if (response === STATUS_RESPONSE.ERROR)
            filesToEdit.push(file);
    }

    console.log('2. Cantidad de documentos a editar:', filesToEdit.length);

    const filesErrorEdit = [];
    for (let index = 0; index < filesToEdit.length; index++) {
        const file = filesToEdit[index];
        const response = await addHeadertoCsv(file);
        if (response === CREATE_STATUS_RESPONSE.ERROR)
            filesErrorEdit.push(file);
    }

    console.log('3.1. Cantidad de documentos editados:', filesToEdit.length - filesErrorEdit.length);
    console.log('3.2. Cantidad de documentos con error al editar:', filesErrorEdit.length);

}

bootstrap()