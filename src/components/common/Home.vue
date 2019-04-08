<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="contain">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      tagsList: [],
    };
  },
  components: {
    vHead,
    vSidebar,
  },

  computed: {
    ...mapState([
      'loginInfo',
      'collapse'
    ])
  },
  methods: {}
};
</script>

<style>
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 1200px;
    overflow-x: auto; 
  }

  .contain {
    height: 100%;
    padding: 0;
    overflow-x: auto; 
  }
</style>
