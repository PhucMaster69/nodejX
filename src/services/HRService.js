import db from '../models/index';

let createNewLog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Site1d.create({
                TAG_ID: data.id,
                TAG_NAME: data.name,
                VALUE: data.value,
                TIMESTAMP: data.datetime
            })
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewLog: createNewLog
}