<template>
  <div class="error-page">
    <div class="error-code">
      4<span>0</span>4
    </div>
    <div class="error-desc">The requested URL was not found on this server.</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">Home</el-button>
      </router-link>
      <el-button class="error-btn" type="primary" size="large" @click="goBack">Back</el-button>
    </div>
    <el-button type="text" size="small" @click="clear">Clear</el-button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  methods: {
    ...mapMutations([
      'clearSession'
    ]),
    goBack() {
      this.$router.go(-1);
    },
    clear() {
      this.clearSession();
      this.$router.push('/login');
    }
  }
};
</script>


<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
}
.error-code {
  line-height: 1;
  font-size: 250px;
  font-weight: bolder;
  color: #2d8cf0;
}
.error-code span {
  color: #00a854;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}
.error-btn {
  margin-left: 100px;
}
</style>
