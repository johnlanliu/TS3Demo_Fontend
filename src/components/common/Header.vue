<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">Anytrek Management System</div>
    <v-version></v-version>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 多语言切换 -->
      <el-dropdown class="change-lang" @command="handleChangeLang">
        <span class="el-dropdown-link">
          {{ langs }}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in langList"
            :key="item.key"
            :command="item.key"
            :divided="index !== 0">{{ item.value }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        <!-- 消息中心
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
        -->
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{loginInfo.username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="https://www.anytrek.com/" target="_blank">
              <el-dropdown-item>About Anytrek</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="changepwd">Change password</el-dropdown-item>
            <el-dropdown-item divided command="loginout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip
            effect="dark"
            :content="fullscreen?`Cancel Full Screen`:`Full Screen`"
            placement="bottom"
          >
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
    <change-pwd v-model="visible"></change-pwd>
  </div>
</template>
<script>
import { logout } from '@/api/getData';
import { mapMutations, mapState } from 'vuex';
import { getStore } from '@/config/mUtils';
import vVersion from '@/components/common/Version.vue';
import ChangePwd from '@/components/common/ChangePwd';
export default {
  data() {
    return {
      fullscreen: false,
      message: 2,
      langList: [
        { key: 'en', value: 'English' },
        { key: 'es', value: 'Español'},
        { key: 'zh', value: '简体中文'}
      ],
      langs: '',
      visible: false
    };
  },

  created() {
    // 默认语言包为英语
    const langs = getStore('locale');
    langs ? this.changeLang(langs) : this.changeLang('en');
  },

  components: {
    vVersion,
    ChangePwd
  },

  computed: {
    ...mapState([
      'loginInfo',
      'lang',
      'collapse'
    ])
  },

  methods: {
    ...mapMutations([
      'clearSession',
      'saveLang',
      'saveLocale',
      'saveCollapse'
    ]),

    changeLang(locale) {
      const obj = this.langList.find(v => {
        return v.key === locale;
      });
      this.langs = obj.value;
      const main = this.$t('main');
      this.saveLocale(locale);
      this.saveLang({ ...main });
    },

    // 用户名下拉菜单选择事件
    handleCommand(command) {
      switch(command){
      case 'loginout':
        logout({});
        this.clearSession();
        this.$router.push('/login');
        break;
      case 'changepwd':
        this.visible = true;
        break;
      default:
        break;
      }
    },

    // 切换多语言
    handleChangeLang(lang) {
      this.$i18n.locale = lang;
      if(this.$route.path.indexOf('map') > -1)
        setTimeout(() => {
          window.location.reload();
        }, 500);
      this.changeLang(lang);
    },

    // 侧边栏折叠
    collapseChage() {
      this.saveCollapse(!this.collapse);
    },

    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 40px;
}
.header .logo {
  float: left;
  line-height: 40px;
}
.header-right {
  float: right;
  padding-right: 20px;
}
.header-user-con {
  display: flex;
  height: 40px;
  align-items: center;
}
.btn-fullscreen {
  margin-left:20px;
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 25px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}

.change-lang {
}
</style>
