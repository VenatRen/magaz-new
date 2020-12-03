/**
 * Метод сравнения двух объектов
 * @param  {any} x - первый объект
 * @param  {any} y - второй объект
 * @returns {boolean}
 */
Object.equals = ( x, y ) => {
    if ( x === y ) return true;
        // if both x and y are null or undefined and exactly the same

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
        // if they are not strictly equal, they both need to be Objects

    if ( x.constructor !== y.constructor ) return false;
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.

    for ( var p in x ) {
        if ( ! x.hasOwnProperty( p ) ) continue;
        // other properties were tested using x.constructor === y.constructor

        if ( ! y.hasOwnProperty( p ) ) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if ( x[ p ] === y[ p ] ) continue;
        // if they have the same strict value or identity then they are equal

        if ( typeof( x[ p ] ) !== "object" ) return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
        // Objects and Arrays must be tested recursively
    }

    for ( p in y ) {
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
        // allows x[ p ] to be set to undefined
    }
    return true;
};

/**
 * Метод, который ограничивает значение по заданному промежутку
 * @param  {number} num - число
 * @param  {number} min - минимальное значение
 * @param  {number} max - максимальное значение
 * @returns {number}
 */
Math.clamp = (num, min, max) => {
	return Math.min(Math.max(num, min), max);
};

/**
 * Метод, который генерирует случайное целое число по заданному промежутку
 * @param  {number} min - минимальное значение
 * @param  {number} max - максимальное значение
 * @returns {number}
 */
Math.randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
/**
 * Генерирует случайную строку заданной длины
 * @param  {number} len - длина
 * @returns {string}
 */
export const randomString = (len) => {
    let result = "";
    for ( let i = 0; i < len; i++ ) {
        result += CHARS.charAt(Math.randomInt(0, len));
    }
    return result;
};