const fs = require('fs');
const csv = require('csv-parser');
const pgp = require('pg-promise')();

// const db = pgp({
//     connectionString: conexion a db
// })

const sourcePqrs = 'inputPqr.csv';

const dataCostumers = [];

fs.createReadStream(sourcePqrs)
    .pipe(csv())
    .on('data', (row) => {
        const [firtsName, lastName] = row.nombreInterpone.split(' ');
        const subjectValue = row.descripcion.substring(0,50);
        const transformedRow = {
            firts_name: firtsName,
            last_name: lastName,
            company: row.nombre2,
            phones: row.telefonoInterpone,
            addres: row.direccionInterpone,
            city: row.idCiudadInterpone,
            // conversations
            customer_email: row.emailinterpone,
            subject: subjectValue,
            preview: row.descripcion,
            channel: row.id_tipo_medio,
            // threads
            from: row.emailinterpone,
        };
        data.push(transformedRow);
    })
    .on('end', () => {
        const customers = new pgp.helpers.ColumnSet(['first_name', 'last_name','company', 'phones', 'addres', 'city'], {table: 'costumers'});
        const insert = pgp.helpers.insert(data, customers);

        const conversations = new pgp.helpers.ColumnSet(['customer_email','subject'], {table: 'conversations'});
        const insertConversations = pgp.helpers.insert(data, conversations);

        const threads = new pgp.helpers.ColumnSet(['from'], {table: 'threads'})

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