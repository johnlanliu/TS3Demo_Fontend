/**
 * 时间戳转时间
 * @param  {String} timestamp 时间戳
 * @return {Object} 时间
 *
 * 例如：
 * timestampToDate('1484222693'); // Thu Jan 12 2017 20:04:53 GMT+0800 (中国标准时间)
 */
export function timestampToDate(timestamp) {
  let date = new Date();

  date.setTime(timestamp);

  return date;
}

/**
 * 时间转时间戳
 * @param  {num or string} 时间
 * @return {timestamp} 时间戳
 *
 * 例如：
 * timestampToDate('1484222693'); // Thu Jan 12 2017 20:04:53 GMT+0800 (中国标准时间)
 */
export function dateToTimestamp(date) {
  let timestamp = Math.ceil((new Date(date)).getTime());
  return timestamp;
}

/**
 * 获取某一天时间
 * @param  {num} 与今天相差天数  负数为过去  正数为未来
 * @return {date} 日期
 *
 * 例如：
 * timestampToDate('1484222693'); // Thu Jan 12 2017 20:04:53 GMT+0800 (中国标准时间)
 */
export function getDate(t) {
  let date = new Date();
  date.setDate(date.getDate() + t);
  date = formatDate(date, 'yyyy-MM-dd');
  return date;
}

/**
 * 秒转化成时分秒
 * @param  {num} 秒数
 * @return {format} 时分秒
 *
 * 例如：
 * timestampToDate(1000); // 00:16:40 (中国标准时间)
 */
export function secondFormat(s) {
  if(s < 0) return false;
  const time = {
    'd': Math.floor(s/3600/24),
    'h': Math.floor(s%(3600*24)/3600),
    'm': Math.floor(s%3600/60),
    's': s%(60)
  };

  // let format = 'hh小时mm分钟ss秒';
  // for (let k in time) {
  //   if (new RegExp('(' + k + ')').test(format)) {
  //     format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? time[k] : ('00' + time[k]).substr(('' + time[k]).length));
  //   }
  // }
  return time;
}

 /**
  * 获取特定格式时间
  * @param  {Object} date   时间
  * @param  {String} format 格式
  * @return {String} 特定格式的时间
  *
  * 例如：
  * var now = new Date(); // Mon Jan 16 2017 14:32:22 GMT+0800 (中国标准时间)
  * formatDate(now, 'yyyy-MM-dd h:m:s'); // 2017-01-16 14:32:22
  */
export function formatDate(date, format) {
  let time = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let k in time) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? time[k] : ('00' + time[k]).substr(('' + time[k]).length));
    }
  }

  return format;
}

/**
 * 时间戳转特定格式时间
 * @param  {String} timestamp 时间戳
 * @return {String} 特点格式时间
 *
 * 例如：
 * timestampFormatDate('1484222693', 'yyyy-MM-dd'); // 2017-01-12
 */
export function timestampFormatDate(timestamp, format) {
  let date;
  let result = '-'
  if(timestamp) {
    date = timestampToDate(timestamp);
    result = formatDate(date, format);
  }

  return result;
}

/*
*  获取一段时间内的月份
*  start 开始月份
*  end  结束月份
*/
// 获取某段时间的月份
export function  getMonths(start, end) {
  let s = start.replace('-', '');
  let e = end.replace('-', '');
  if (s > e) {
    return [];
  } else if (s === e) {
    return [end];
  }

  let months = [end];
  while(s < e) {
    months.push(getPre(e));
    let len = months.length;
    e = months[len-1].replace('-', '');
  }

  function isTen(n) {
    return n > 9 ? n : '0' + n;
  }

  function getPre(time) {
    let y = time.substring(0, 4);
    let m = time.substring(4, 6);
    if (--m) {
      return y + '-' + isTen(m);
    }else {
      return (y - 1) + '-12';
    }
  }

  return months;
}

/**
 * 获取现在时间之前N个月时间list
 * @param  {Number} lastMonth 之前lastMonth个月
 * @return {Array(N)} N个月份列表
 *
 * 例如：
 * getMonthList(3); // ['2017-03', '2017-04', '2017-05'];
 */

export function getMonthList(lastMonth = 6) {
  const now = new Date();
  const year = now.getFullYear();
  const mon = now.getMonth();
  const array = [];
  for (let index = 0; index < lastMonth; index++) {
    array.push(newFormat(year, mon - index, 1));
  };
  return array;
};


function newFormat(y, m, d) {
  const date = new Date(y, m, d);
  return formatDate(date, 'yyyy-MM');
};

export function newToStamp(y, m, d) {
  const date = new Date(y, m, d);
  return dateToTimestamp(date);
}

/**
 * JS获取距当前时间差(小时)
 *
 * @param int time JS毫秒时间戳
 *
 */
export function getTimeDiff(time) {
  const startDate = timestampToDate(time);
  const endDate = new Date();
  var ms = endDate.getTime() - startDate.getTime();
  if(ms < 0) return 0;
  return ms / 1000 / 60 / 60;
}

/** *
 * VUE风格的混入机制 vue.mixins
 * 时间格式化
 * 分两种：
 * 1.过滤器调用
 * 2.方法调用
 * @type {{filters: {formatDate: timeFormatUtil.filters.formatDate}, methods: {formatDate: timeFormatUtil.methods.formatDate}}}
 */
export var timeMixins = {
  filters: {
    formatDate: function(value) {
      if(!value) return '';
      var time = new Date(value);
      var timeZone = time;
      var result = `${timeZone.getFullYear()}-${timeZone.getMonth() + 1}-${timeZone.getDate()} ${timeZone.getHours()}:${timeZone.getMinutes()}`;
      return result;
    }
  },
  methods: {
    formatDate: function(row, column, cellValue, index) {
      if(!cellValue) return '';
      var time = new Date(cellValue);
      var timeZone = time;
      var result = `${timeZone.getFullYear()}-${timeZone.getMonth() + 1}-${timeZone.getDate()} ${timeZone.getHours()}:${timeZone.getMinutes()}`;
      return result;
    }
  }
};
