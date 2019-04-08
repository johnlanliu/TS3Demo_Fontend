<template>
  <el-dialog
    custom-class="mapDialog"
    @opened="resizeMap"
    :visible.sync="isOpen"
    :show-close="false" width="60vw" top="20vh">
    <div slot="title" style="padding:0px;"></div>
    <!-- google map -->
    <div class="map">
      <gmap-map  ref="map" :resize-bus="customBus" :center="position" :zoom="14" style="width:100%; height: 100%;">
        <gmap-info-window ref="infoWindow" :position="position" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
          <div>
            <!-- name -->
            <p class="base-info">Name: Status <i class="status-icon" :style="'background:' + statusColor"></i></p>
            <!-- select -->
            <div>
              <el-dropdown trigger="click" @command="handleHistoryCommand">
                <span class="el-dropdown-link">
                  History Trail Data<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in pastH" :key="item + 'H'"
                    :command="item + 'H'">Past {{ item + (item === 1 ? ' hr' : ' hrs') }}</el-dropdown-item>
                  <el-dropdown-item v-for="item in pastD" :key="item + 'D'"
                    :command="item + 'D'">Past {{ item + (item === 1 ? ' day' : ' days') }}</el-dropdown-item>
                  <el-dropdown-item command="custom">Custom</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown trigger="click" @command="handleTripCommand">
                <span class="el-dropdown-link">
                  Trip Report Data<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="7D">Past 7 days</el-dropdown-item>
                  <el-dropdown-item command="14D">Past 14 days</el-dropdown-item>
                  <el-dropdown-item v-for="item in pastM" :key="item + 'M'"
                    :command="item + 'M'">Past {{ item + (item === 1 ? ' month' : ' months') }}</el-dropdown-item>
                  <el-dropdown-item command="1Y">Past 1 year</el-dropdown-item>
                  <el-dropdown-item command="custom">Custom</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- tabs -->
            <el-menu
              default-active="1"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleChangeMenu">
              <el-menu-item index="1" style="font-size: 12px;">Basic</el-menu-item>
              <el-menu-item index="2" style="font-size: 12px;">Detailed</el-menu-item>
              <el-menu-item index="3" style="font-size: 12px;">Directions</el-menu-item>
            </el-menu>
            <!-- Basic -->
            <div v-if="currMenu === '1'" class="menu-content">
              <p><label>Address:</label>{{ device.address }}</p>
              <p><label>Status:</label></p>
              <p><label>Battery:</label>{{ (device.battery)}}</p>
              <p><label>Location time:</label></p>
              <p><label>Connecting time:</label></p>
            </div>
            <!-- Detailed -->
            <div v-if="currMenu === '2'" class="menu-content">
              <p><label>Device ID:</label>{{ device.deviceId }}</p>
              <p><label>Model:</label>{{ device.modelName }}</p>
              <p><label>Version:</label>{{ device.fwVer }}</p>
              <p><label>Driver Mobile:</label>{{ device.mobile }}</p>
              <p><label>VIN/Plate Num:</label></p>
              <p><label>Signal:</label>{{ device.signals + '%' }}</p>
            </div>
            <!-- Basic -->
            <div v-if="currMenu === '3'" class="menu-content">
              <label style="vertical-align: top;">Direction Address:</label>
              <el-input v-model="address" resize="none" type="textarea" :rows="4" placeholder="Please enter direction address" style="width: 250px"></el-input>
            </div>
          </div>
        </gmap-info-window>
        <gmap-marker :key="device.deviceId" :position="position" :title="device.deviceId+''" @click="handleToggleWindow"></gmap-marker>
      </gmap-map>
    </div>
  </el-dialog>
</template>

<script>
  import { exceptionUtil } from '@/utils/exceptionUtil.js';
  import { getTimeDiff } from '@/utils/time';
  import { getStore } from '@/config/mUtils';
  import { mapState } from 'vuex';
  import Vue from 'vue';

  export default {
    mixins: [exceptionUtil],
    props: {
      device: [Object]
    },
    data() {
      return {
        pastH: [1, 2, 4, 6, 8, 10, 12],
        pastD: [1, 2, 3, 7, 14],
        pastM: [1, 2, 3, 6],
        loading: false,
        isOpen: false,
        infoWinOpen: false,
        currMenu: '1',
        address: '',
        customBus: new Vue()
      };
    },

    computed: {
      ...mapState([
        'lang',
        'locale'
      ]),

      position() {
        return { lat: parseFloat(this.device.lat), lng: parseFloat(this.device.lng) };
      },

      statusColor() {
        const deviceStatusColors = {
          offline: '#909399',
          onlineAndCharging: '#67C23A',
          onlineAndNotCharging: '#E6A23C'
        };
        let color;
        if(this.device) {
          switch(this.device.trackerStatus) {
          case 1:
            color = deviceStatusColors.onlineAndNotCharging;
            break;
          case 2:
            color = deviceStatusColors.onlineAndCharging;
            break;
          default:
            color = deviceStatusColors.offline;
          }
        }
        return color;
      }
    },

    mounted() {
      // window.google.maps.event.trigger(this.$refs.map.$mapObject, 'resize');
    },

    beforeDestroy() {
    },

    created() {
    },

    watch: {
      isOpen(val) {
        if(!val)
          this.infoWinOpen = false;
      }
    },

    methods: {
      showDialog() {
        this.isOpen = true;
      },

      resizeMap() {
        this.customBus.$emit('resize');
        // 地图放在dialog时infowindow默认打开的话， 有时会出现为空的bug,  所以需要加入下面这行代码
        this.$refs.infoWindow._openInfoWindow();
        // this.device = JSON.parse(JSON.stringify(this.device));
        // this.$refs.map&&this.$refs.map.resizePreserveCenter();
      },

      handleToggleWindow() {
        this.infoWinOpen = !this.infoWinOpen;
      },

      handleHistoryCommand(command) {},

      handleTripCommand(command) {},

      handleChangeMenu(key) {
        this.currMenu = key;
      }
    }
  };
</script>
<style>
  .mapDialog .el-dialog__header{
    padding: 0px !important;
  }
</style>
<style lang="scss" scoped>
  .map {
    width: 100%;
    height: 60vh;
    margin: 0 auto;
  }

  .loading-wrap {
    display: inline-block;
    width: 500px;
    height: 500px;
    text-align: center;
    line-height: 500px;
  }

  .map-loading {
    font-size: 32px;
    color: #409EFF;
  }

  .status-icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .base-info {
    margin: 5px 0 8px;
  }

  .el-dropdown {
    font-size: 12px;
    margin-right: 15px;
  }

  .menu-content {
    width: 370px;
    height: 150px;
    padding: 10px 0 0;
    p {
      padding-bottom: 5px;
      font-weight: 600;
    }

    label {
      padding-right: 10px;
      font-weight: normal;
    }
  }
</style>
