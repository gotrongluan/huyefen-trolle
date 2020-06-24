import moment from 'moment';
import _ from 'lodash';

export const delay = ms => new Promise(res => setTimeout(res, ms));

export const fromNow = unixTime => {
    const diff = moment().dayOfYear() - moment(unixTime).dayOfYear();
    if (diff === 0) return moment(unixTime).format("H:mm");
    if (diff < 7) return moment(unixTime).format("ddd");
    else return moment(unixTime).format("MMM D");
};

export const truncate = (str, len) => {
    return _.truncate(str, {
        'length': len,
        'separator': /,? +/
    });
};

export const range = n => {
    let i = 0;
    const result = [];
    while (i < n) {
        result.push(i);
        i++;
    }
    return result;
};

export const toQueryString= json => {
    return Object.keys(json)
      .map(k => `${k}=${encodeURIComponent(json[k])}`)
      .join('&');
};

export const capitalText = name => {
    const matches = name.match(/\b(\w)/g); // ['J','S','O','N']
    return _.join(_.takeRight(matches, 2), '');
};