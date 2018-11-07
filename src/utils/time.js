const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

const TimeUtils = {

  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  ONE_DAY,

  formatTimestamp(date, format) {
    let timestamp = parseInt(date, 10);
    if (timestamp < 1e12) {
      timestamp *= 1000;
    }
    const newDate = new Date(timestamp);
    const newFormat = format || 'YYYY-MM-DD';
    const values = {
      Y: newDate.getFullYear(),
      M: newDate.getMonth() + 1,
      D: newDate.getDate(),
      h: newDate.getHours(),
      m: newDate.getMinutes(),
      s: newDate.getSeconds(),
    };

    return newFormat.replace(/Y+|M+|D+|h+|m+|s+/g, (match) => {
      let result = values[match[0]];
      if (match.length > 1 && result.toString().length !== match.length) {
        result = ((new Array(match.length)).join('0') + result).slice(-2);
      }
      return result;
    });
  },

};

export default TimeUtils;
