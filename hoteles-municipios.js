(async () => {
    const fs = require('fs/promises');
    const file = await fs.readFile('hoteles.json', 'utf-8');
    const data = JSON.parse(file);

    const fields = data.fields.map(field => field.id);

    const dataProcessed = data.records.map(record => {

        const dataElement = {}

        for(let i = 0; i < record.length; i++){
            dataElement[fields[i]] = record[i];
        }

        return dataElement
    })

    dataElement = dataProcessed.reduce((acc, item) => {
        const municipi = item['Municipi']
        const grup = item['Grup']

        acc[municipi] = acc[municipi] || {}
        acc[municipi][grup] = acc[municipi][grup] + 1 || 1

        return acc
    })

    const json = JSON.stringify(dataProcessed, null, 2);
    await fs.writeFile('hoteles-por-municipio.json', json, 'utf8');

})()

