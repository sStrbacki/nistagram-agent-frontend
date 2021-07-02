export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function findById(array, id) {
    return array.find(element => element.id === id);
}

export function deleteById(array, id) {
    const index = array.findIndex(element => element.id === id);
    array.splice(index, 1);
}
