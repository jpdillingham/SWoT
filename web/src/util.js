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
    };

    return formatTime(duration);
};

export const getGuid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

export const swapArrayElements = (array, index1, index2) => {
    let copy = array.slice();

    let temp = copy[index1];
    copy[index1] = copy[index2];
    copy[index2] = temp;

    return copy;
};

export const getUnixTimestamp = (dateString) => {
    return parseInt((new Date(dateString).getTime()).toFixed(0), 10);
};

export const validateEmail = (email) => {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const sortByProp = (prop, predicate = 'asc') => {
    return (a, b) => {
        a = a[prop];
        b = b[prop];
        
        if (predicate === 'asc') {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        }
        else { 
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        }
    };
};

// https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
export const fontContrastColor = (hexColor) => {
    let rgb = hexToRgb(hexColor);
	let C, L;

	C = [rgb.r/255, rgb.g/255, rgb.b/255];

    for (var i = 0; i < C.length; ++i) {
        if (C[i] <= 0.03928) {
            C[i] = C[i] / 12.92;
        } 
        else {
            C[i] = Math.pow((C[i] + 0.055) / 1.055, 2.4);
        }
    }

    L = 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];

    if (L > 0.179) {
        return '#000';
    } 
    else {
        return '#FFF';
    }
};

export const hexToRgb = (hexColor) => {
    if (typeof hexColor === 'string') {
        let bigint = parseInt(hexColor.replace('#', ''), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        
        return { r: r, g: g, b: b };
    }

    return { r: 255, g: 255, b: 255 };
};

export const validateUrl = (str) => {
    // eslint-disable-next-line
    var pattern = new RegExp('^(https?:\/\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\.)+[a-z]{2,}|((\\d{1,3}\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\d_]*)?$','i');
    return pattern.test(str);
};