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

export const validateEmail = (email) => {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const getElapsedTime = (start, end) => {
    end = end || new Date().getTime();
    let duration = Math.trunc((end - start) / 1000);

    let formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [
          h,
          m > 9 ? m : (h ? '0' + m : m || '0'),
          s > 9 ? s : '0' + s,
        ].filter(a => a).join(':');
    }

    return formatTime(duration);
}