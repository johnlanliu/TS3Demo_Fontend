/** *
 * VUE风格的混入机制 vue.mixins
 * 时间格式化
 * 分两种：
 * 1.过滤器调用
 * 2.方法调用
 * @type {{filters: {formatDate: timeFormatUtil.filters.formatDate}, methods: {formatDate: timeFormatUtil.methods.formatDate}}}
 */
export var timeFormatUtil = {
  filters: {
    formatDate: function(value, includeSecond) {
      if(!value) return '';
      let time = new Date(value);
      let year = time.getFullYear();
      let month = (time.getMonth()+1)>9 ? (time.getMonth()+1) : ('0'+(time.getMonth()+1));
      let day = (time.getDate())>9 ? time.getDate() : '0'+time.getDate();
      let hour = (time.getHours())>9 ? time.getHours() : '0'+time.getHours();
      let minute = (time.getMinutes())>9 ? time.getMinutes() : '0'+time.getMinutes();
      let dStr = `${year}-${month}-${day} ${hour}:${minute}`;
      if(includeSecond) {
        let second = (time.getSeconds())>9 ? time.getSeconds() : '0'+time.getSeconds();
        dStr += ':' + second;
      }
      return dStr;
    }
  },
  methods: {
    _formatDate: function(value, includeSecond) {
      if(!value) return '';
      let time = new Date(value);
      let year = time.getFullYear();
      let month = (time.getMonth()+1)>9 ? (time.getMonth()+1) : ('0'+(time.getMonth()+1));
      let day = (time.getDate())>9 ? time.getDate() : '0'+time.getDate();
      let hour = (time.getHours())>9 ? time.getHours() : '0'+time.getHours();
      let minute = (time.getMinutes())>9 ? time.getMinutes() : '0'+time.getMinutes();
      let dStr = `${year}-${month}-${day} ${hour}:${minute}`;
      if(includeSecond) {
        let second = (time.getSeconds())>9 ? time.getSeconds() : '0'+time.getSeconds();
        dStr += ':' + second;
      }
      return dStr;
    },
    formatDate: function(row, column, cellValue, index) {
      return this._formatDate(cellValue);
    }
  }
};
