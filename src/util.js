export const getGuid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export const swap = (array, index1, index2) => {
    let copy = array.slice();

    let temp = copy[index1];
    copy[index1] = copy[index2];
    copy[index2] = temp;

    return copy;
}
