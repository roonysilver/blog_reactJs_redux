export const TransformerUtil = {
    listToObj: (list, key) => list.reduce((obj, current, idx) => {
        obj[current[key]] = {
            ...current,
            order: idx
        };
        return obj;
    }, {}),
    objToList: (list) => Object.values(list).sort((a, b) => a.order > b.order ? 1 : -1),
}