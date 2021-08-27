const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

// aquí vamos a crear las diferentes constantes
// encodeURIComponent nos garantizá que si por alguna razón hay algunos caracteres especiales
// no tengamos problemas a la hora de conectarnos.

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
// mongodb+srv://db_user_platzivideos:<password>@cluster0-nnl4g.mongodb.net/test?retryWrites=true&w=majority

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    //connection no es una variable que hayamos declarado antes, funciona como una variable estática
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(error => {
          if (error) {
            reject(error);
          }
          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;//Si la conección existe la retorno
  }

  //Creando nuestra implementación de acciones
  getAll(collection, query) {
    //Nos va a traer todos los elementos de la conección
    return this.connect().then((db) => {
      // return db.collection(collection).find(query).toArray();
      return db.
        collection(collection)
        .find(query)
        .toArray();//para manenejarlo como tipo json
    });
  }

  get(collection, id) {
    //nos va a traer un único elemento de la conección
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    //nos permite agregar datos
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    //permite actualizar un dato en específico
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id), $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    //nos permite borrar un dato en específico
    //Nos no devuelve un id, pero para tener una referencia de cual eliminamos vamos a pasar ese id como referencia
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
