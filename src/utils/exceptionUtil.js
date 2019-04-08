/** *
 * VUE风格的混入机制 vue.mixins
 * 错误处理
 */
import store from '@/store/index';
import { mapState } from 'vuex';
export var exceptionUtil = {
  computed: {
    ...mapState([
      'lang'
    ])
  },

  methods: {
    exceptionHandle: function(errorCode) {
      switch (parseInt(errorCode)) {
        // 未授权
      case 401:
      case 403:
        this.$router.push('/403');
        break;

      // 登陆已过期
      case 4031:
        store.dispatch('clearSession');
        this.$router.push('/login');
        break;
      default :
        // this.$message.error('Error Code: ' + errorCode);
        const msg = this.lang[errorCode];
        msg ? this.$message.error(store.state.lang[errorCode]) : this.$message.error('Error Code: ' + errorCode);
      }
    }
  }
};
