import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME, DATABASE_VERSION } from './config';

// Создаем соединение с бд
const db = SQLite.openDatabase(DATABASE_NAME, DATABASE_VERSION);

/**
 * Выполняет команду SQL
 * @param  {string} sql - инструкция SQL для выполнения
 * @param  {array} args - список значений для замены ? в инструкции
 * @param  {function} onSuccess - коллбэк при успешном выполнении команды
 * @param  {function} err - коллбэк при ошибке
 */
const executeSql = (sql, args, onSuccess, err) => {
    db.transaction( (tr) => {
        tr.executeSql(sql, args, onSuccess, err);
    });
};

/**
 * Создаёт таблицы в бд
 */
export const createDBTables = () => {
    executeSql(`CREATE TABLE IF NOT EXISTS CategoryList(
        name TEXT,
        productCategoryId INTEGER UNIQUE,
        imageLink TEXT)`, [], null, (tr, err) => console.log("SOMETHING WENT WRONG", err));

    executeSql(`CREATE TABLE IF NOT EXISTS Cart(
        name TEXT,
        productId INTEGER UNIQUE,
        imageLink TEXT,
        productQuantity INTEGER,
        price INTEGER,
        selectedVariants TEXT,
        stockQuantity INTEGER)`, [], null, (tr, err) => console.log("SOMETHING WENT WRONG", err));

    executeSql(`CREATE TABLE IF NOT EXISTS Images(
        imageLink TEXT UNIQUE,
        imageData TEXT)`, [], null, (tr, err) => console.log("SOMETHING WENT WRONG", err));

    executeSql(`CREATE TABLE IF NOT EXISTS Orders(
        id INTEGER PRIMARY KEY NOT NULL,
        uuid TEXT UNIQUE,
        customerName TEXT,
        customerPhone TEXT,
        customerAddress TEXT,
        customerFloor TEXT,
        orderNotes TEXT,
        orderDeliveryTime INTEGER,
        status INTEGER,
        products TEXT,
        totalPrice INTEGER)`, [], null, (tr, err) => console.log("SOMETHING WENT WRONG", err));

        executeSql(`CREATE TABLE IF NOT EXISTS User(
            uuid TEXT UNIQUE,
            username TEXT,
            email TEXT,
            password TEXT,
            jwtAuthToken TEXT,
            jwtRefreshToken TEXT)`, [], null, (tr, err) => console.log("SOMETHING WENT WRONG", err));
};

/**
 * Добавляет новую, или заменяет старую категорию в бд
 * @param {string} name - название категории
 * @param {number} productCategoryId - id категории
 * @param {string} imageLink - ссылка на картинку
 */
export const addCategoryToDB = (name, productCategoryId, imageLink) => {
    executeSql(`INSERT OR REPLACE INTO CategoryList(
    	name,
        productCategoryId,
        imageLink) VALUES(?, ?, ?)`, [name, productCategoryId, imageLink]);
};

/**
 * Добавляет новый, или заменяет старый товар корзины в бд
 * @param {string} name - название товара
 * @param {number} productId - id товара
 * @param {string} imageLink - ссылка на картинку
 * @param {number} productQuantity - количество товара
 * @param {number} price - цена товара
 * @param {object} selectedVariants - выбранные аттрибуты товара
 * @param {number} stockQuantity - максимальное количество товара
 */
export const addProductToCartDB = (name, productId, imageLink, productQuantity, price, selectedVariants, stockQuantity) => {
    try {
        selectedVariants = JSON.stringify(selectedVariants);
    } catch {
        selectedVariants = JSON.stringify([]);
    }
    executeSql(`INSERT OR REPLACE INTO Cart(
    	name,
        productId,
        imageLink,
        productQuantity,
        price,
        selectedVariants,
        stockQuantity) VALUES(?, ?, ?, ?, ?, ?, ?)`, [name, productId, imageLink, productQuantity, price, selectedVariants, stockQuantity]);
};

/**
 * Добавляет картинку в бд
 * @param {string} imageLink - ссылка на картинку
 * @param {string} imageData - картинка в формате base64
 */
export const addImageToDB = (imageLink, imageData) => {
    executeSql(`INSERT OR REPLACE INTO Images(
    	imageLink,
        imageData) VALUES(?, ?)`, [imageLink, imageData]);
};

/**
 * Добавляет новый, или заменяет старый заказ в бд
 * @param {string} uuid - uuid заказа
 * @param {string} customerName - имя заказчика
 * @param {string} customerPhone - телефон заказчика
 * @param {string} customerAddress - адрес заказчика
 * @param {string} customerFloor - этаж заказчика
 * @param {string} customerNotes - примечания к заказу
 * @param {string} customerDeliveryTime - время доставки
 * @param {number} status - статус заказа
 * @param {map} products - список товаров
 * @param {number} products - общая цена
 */
export const addOrderToDB = (uuid, customerName, customerPhone, customerAddress, customerFloor, orderNotes, orderDeliveryTime, status, products, totalPrice) => {
    try {
        products = JSON.stringify(Object.fromEntries(products));
    } catch {
        products = JSON.stringify([]);
    }
    executeSql(`INSERT OR REPLACE INTO Orders(
        uuid,
        customerName,
        customerPhone,
        customerAddress,
        customerFloor,
        orderNotes,
        orderDeliveryTime,
        status,
        products,
        totalPrice) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [uuid, customerName, customerPhone, customerAddress, customerFloor, orderNotes, orderDeliveryTime, status, products, totalPrice]);
};

/**
 * Удаляет товар корзины из бд
 * @param {number} productId - id товара
 */
export const deleteProductFromCart = (productId) => {
    executeSql(`DELETE FROM Cart WHERE productId=?`, [productId], null, (tr, err) => console.log(`ERROR DELETING RECORD ${productId}`, err));
};

/**
 * Очищает таблицу Cart
 */
export const clearCart = () => {
    executeSql(`DELETE FROM Cart`, [], null, (tr, err) => console.log(`ERROR CLEARING CART`, err));
};
/**
 * Удаляет заказ из бд
 * @param {string} uuid - uuid заказа
 */
export const deleteOrderFromDB = (uuid) => {
    executeSql(`DELETE FROM Orders WHERE uuid=?`, [uuid], null, (tr, err) => console.log(`ERROR DELETING ORDER RECORD ${uuid}`, err));
};

/**
 * Запрашивает картинку из бд
 * @param {string} imageLink - ссылка на картинку
 * @param {function} cb - коллбэк при успешном выполнении
 * @param {function} err - коллбэк при ошибке
 */
export const getImageFromDB = (imageLink, cb, err) => {
    executeSql(`SELECT imageData, imageLink FROM Images WHERE imageLink='${imageLink}' LIMIT 1`, [], cb, err);
};

/**
 * Запрашивает товары корзины из бд
 * @param {function} callback - коллбэк при успешном выполнении
 * @param {function} error - коллбэк при ошибке
 */
export const getCartFromDB = (callback, error) => {
    executeSql(`SELECT * FROM Cart`, [], callback, error);
};

/**
 * Запрашивает список категорий из бд
 * @param {function} callback - коллбэк при успешном выполнении
 * @param {function} error - коллбэк при ошибке
 */
export const getCategoryListFromDB = (callback, error) => {
    executeSql(`SELECT * FROM CategoryList LIMIT 30`, [], callback, error);
};

/**
 * Запрашивает список заказов из бд
 * @param {function} callback - коллбэк при успешном выполнении
 * @param {function} error - коллбэк при ошибке
 */
export const getOrdersFromDB = (callback, error) => {
    executeSql(`SELECT * FROM Orders LIMIT 30`, [], callback, error);
};

/**
 * Изменяет статус заказа
 * @param {string} uuid - uuid заказа
 * @param {number} status - статус заказа
 * @param {function} callback - коллбэк при успешном выполнении
 * @param {function} error - коллбэк при ошибке
 */
export const updateOrderStatus = (uuid, status, callback, error) => {
    executeSql(`UPDATE Orders SET status = ? WHERE uuid = ?`, [status, uuid], callback, error);
};

/**
 * Добавляет пользователя в бд
 * @param {string} uuid - uuid пользователя
 * @param {string} username - имя пользователя
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @param {string} jwtAuthToken - jwtAuthToken пользователя
 * @param {string} jwtRefreshToken - jwtRefreshToken пользователя
 */
export const addUserToDB = (uuid, username, email, password, jwtAuthToken, jwtRefreshToken) => {
    executeSql(`INSERT OR REPLACE INTO Orders(
        uuid,
        username,
        email,
        password,
        jwtAuthToken,
        jwtRefreshToken) VALUES(?, ?, ?, ?, ?, ?)`, [uuid, username, email, password, jwtAuthToken, jwtRefreshToken]);
};

/**
 * Обновляет токены пользователя в бд
 * @param {string} uuid - uuid пользователя
 * @param {string} jwtAuthToken - jwtAuthToken пользователя
 * @param {string} jwtRefreshToken - jwtRefreshToken пользователя
 */
export const updateUserTokens = (uuid, jwtAuthToken, jwtRefreshToken) => {
    executeSql(`UPDATE User SET jwtAuthToken = ?, jwtRefreshToken = ? WHERE uuid = ?`, [uuid, jwtAuthToken, jwtRefreshToken, uuid]);
};

/**
 * Получает данные о пользователе из бд
 * @param {function} callback - коллбэк при успешном выполнении
 * @param {function} error - коллбэк при ошибке
 */
export const getUserData = (callback, error) => {
    executeSql(`SELECT * FROM User LIMIT 1`, [], callback, error);
};