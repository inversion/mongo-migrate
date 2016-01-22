module.exports = {
    getConnection: getConnection
};

function getConnection(url, cb) {
    var mongodb = bluebirdPromise.promisifyAll(require('mongodb'));

    mongodb.MongoClient.connect(url, {
        db: {
            w: 'majority'
        }
    }).then((db) => {

        cb(null, {
            connection: db,
            migrationCollection: db.collection('migrations')
        });

    }).catch((err) => {

        cb(err);
    });
}
