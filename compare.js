const path = require('path')
const Fs = require('fs');
const readXlsxFile = require('read-excel-file/node')
const {stringify} = require('csv-stringify');

const dirName = 'compareFiles'
const pathBase = path.join(__dirname, `/${dirName}`);
const dirNameDestination = 'compareFilesApprove'
const pathBaseDestination = path.join(__dirname, `/${dirNameDestination}`);

const createCsv = ({
    rows,
    pathNameWrite
}) => new Promise((resolver) => {
    const options = {
        delimiter: ';'
    };

    stringify(
        rows, 
        options,
        function (_, output) {
            Fs.writeFileSync(pathNameWrite, output, 'utf8', function (err) {
                if (err) {
                    console.log(err);
                    resolver('CREATE_STATUS_RESPONSE.ERROR')
                } else {
                    resolver('CREATE_STATUS_RESPONSE.OK')
                }
            });
        });
})

const getRowsColumn = (rows) => {
    let isHeader = true;
    let rowRequestIds = [];
    for (const row of rows) {
        if (isHeader) {
            isHeader = false;
            continue;
        }

        const [requestId] = row;

        rowRequestIds.push(requestId);
    }

    return rowRequestIds;
}

const readPages = ({
    pathName,
    pageName,
}) => new Promise((resolver) => {
    readXlsxFile(pathName, { sheet: pageName })
        .then((rows) => {
            const rowRequestIds = getRowsColumn(rows);
            resolver(rowRequestIds);
        })
})

const getRowsColumnRef = (rows) => {
    let isHeader = true;
    let rowRequestIds = [];
    for (const row of rows) {
        if (isHeader) {
            isHeader = false;
            continue;
        }

        const [requestId, col1, col2, estado ] = row;

        rowRequestIds.push([
            requestId,
            estado
        ]);
    }

    return rowRequestIds;
}

const readPagesRef = ({
    pathName,
    pageName,
}) => new Promise((resolver) => {
    readXlsxFile(pathName, { sheet: pageName })
        .then((rows) => {
            const rowRequestIds = getRowsColumnRef(rows);
            resolver(rowRequestIds);
        })
})

const pages = [
    'Aprobados SC1',
    'Aprobados SC2'
];

const readCsv = async (fileName) => {
    console.log('1.1. Obtener requestIds')
    const pathName = path.join(pathBase, `/${fileName}`);
    let rowMergeRequestIds = [];
    for (const page of pages) {
        const rowPageRequestIds = await readPages({
            pathName,
            pageName: page
        });

        rowMergeRequestIds = [...rowMergeRequestIds, ...rowPageRequestIds];
    }
    
    const rowUniqueRequestIds = [...new Set(rowMergeRequestIds)];

    console.log('1.1.1. rowMergeRequestIds length', rowMergeRequestIds.length)
    console.log('1.1.2. rowUniqueRequestIds length', rowUniqueRequestIds.length)

    console.log('1.2. Obtener requestIds de reqs');
    const rowPageReqRequestIds = await readPagesRef({
        pathName,
        pageName: 'Reqs'
    });

    console.log('1.2.1. rowPageReqRequestIds length', rowPageReqRequestIds.length)

    if(!rowPageReqRequestIds?.length) return;

    const rowApproveRequestIds = [
        [
            "requestId",
            "estado",
            "aprobado"
        ]
    ];

    const rowUniqueRequestIdsStr = rowUniqueRequestIds.map(item => String(item));
    const rowPageReqRequestIdsStr = rowPageReqRequestIds
        .reduce((acc, next) => {
            const [ requestId ] = next;

            return {
                ...acc,
                [String(requestId)]: next
            }

        }, {});

    for(const requestId of rowUniqueRequestIdsStr) {
        const row = rowPageReqRequestIdsStr[requestId];
        if(!row) {    
            continue;
        }

        rowApproveRequestIds.push([...row, 1]);
    }

    const rowApproveRequestIdsExists = rowApproveRequestIds.flatMap(item => {
        const [ requestId ] = item;
        return String(requestId);
    })

    console.log('1.2.2. rowApproveRequestIdsExists length', rowApproveRequestIdsExists.length)
    for(const item of rowPageReqRequestIds) {
        const [ requestId ] = item;
        const row = rowApproveRequestIdsExists.includes(String(requestId));

        if(row) {    
            continue;
        }

        rowApproveRequestIds.push([requestId, '', 0]);
    }

    console.log('1.2.3. rowApproveRequestIds length', rowApproveRequestIds.length);

    return rowApproveRequestIds;
}

const bootstrap = async () => {

    const files = Fs.readdirSync(pathBase);
    console.log('1. Cantidad de archivos encontrados en el directorio:', files.length);

    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const pathNameWrite = path.join(pathBaseDestination, `/Aprobado_${file.replace('.xlsx', '.csv')}`);
        console.log(pathNameWrite)
        console.log('----------------------', file, `${index+1}/${files.length}`, '----------------------')
        const rowApproveRequestIds = await readCsv(file);
        await createCsv({
            rows: rowApproveRequestIds,
            pathNameWrite 
        })
    }

}

bootstrap()