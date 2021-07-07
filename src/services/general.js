export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function findById(array, id) {
    return array.find(element => element.id === id);
}

export function findByCustomFieldValue(array, fieldName, value) {
    return array.find(element => element[fieldName] === value);
}

export function deleteById(array, id) {
    const index = array.findIndex(element => element.id === id);
    array.splice(index, 1);
}

export function stringMatchesRegex(word, regex) {
    const matched = word.match(regex);
    if (matched === null)
        return false;
    return matched['0'].length === word.length;
}
