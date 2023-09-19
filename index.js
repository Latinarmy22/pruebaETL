const fs = require('fs');
const csv = require('csv-parser');
const pgp = require('pg-promise')();

//connection string database
// const db = pgp({
//     connectionString: conexion a db
// })

//input csv export db 
const sourcePqrs = 'inputPqr.csv';

const dataCostumers = [];

fs.createReadStream(sourcePqrs)
    .pipe(csv())
    .on('data', (row) => {
        const [firtsName, lastName] = row.nombreInterpone.split(' ');
        const transformedRow = {
            firts_name: firtsName,
            last_name: lastName,
            phone: row.telefonoInterpone,
            addres: row.direccionInterpone,
            city: row.idCiudadInterpone,
        };
        data.push(transformedRow);
    })
    .on('end', () => {
        const customers = new pgp.helpers.ColumnSet(['first_name', 'last_name', 'phone', 'addres', 'city'], {table: 'costumers'});
        const insert = pgp.helpers.insert(data, customers);

        db.none(insert)
            .then(() => {
                console.log('inserción de nombre y apellido exitosa');
                pgp.end();
            })
            .catch((error) => {
                console.log('error en la inserción', error);
                pgp.end();
            })
    })