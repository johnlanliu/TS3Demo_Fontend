<template>
  <span class="version">{{version}}</span>
</template>
<script>
import { logout } from '@/api/getData';
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      version: window.trkConfig.version
    };
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.version {
  cursor: pointer;
  font-size: 10px;
  line-height: 50px;
  padding-left: 5px;
}
</style>
