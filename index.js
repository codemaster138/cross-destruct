/**
 * This function can destructure data dynamically from a javascript object
 * @param {any} data An object with all your data
 * @param {any} path A template object desciribing how to destructure the data
 */

function resolve(data, path) {
    if (typeof path === "string") {
        if (path === "*") return data;
        return;
    }
    let returnData = (Array.isArray(data)) ? [] : {};
    Object.keys(path).forEach(key => {
        returnData[key] = resolve(data[key], path[key])
    });
    return returnData;
}

module.exports = resolve;