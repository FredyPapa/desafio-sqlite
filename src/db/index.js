import * as SQLite from "expo-sqlite";

const db= SQLite.openDatabase("products.db");

export const init=()=>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, title TEXT NO NULL, image TEXT NOT NULL)',
                //'DROP TABLE products',
                [],
                () => resolve(),
                (_, err) => reject(err)
            )
        })
    })
    return promise;
}

export const insertProduct = (title, image) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO products (title, image) VALUES (?, ?)',
                [title, image],
                (_, result) => {
                    console.log(result);
                    resolve(result)
                },
                (_, err) => {
                    console.log(err);
                    reject(err)
                }
            )
        })
    })
    return promise;
}

export const getProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM products',
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })}
    )
    return promise;
}

