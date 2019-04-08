let trkConfig = {
  // 版本号
  version: 'v0.1.4',
  // 路由组  用于动态生成路由和动态生成导航栏
  antRouter: '',

  //地图类型  GoogleMap  GoogleMapCN  OpenStreetMap
  mapType: 'GoogleMap',

  //距离单位   km mi    通过该参数转换里程和速度
  disUnit: 'mi',
  spdUnit: this.disUnit==='mi' ? 'mph' : 'km/h',
  //温度单位  c, f
  tempUnit: '',

  orgType: {partner: 4},
  //组织类型类型
  orgTypes: {
    4: { value: 4, label: 'Partner' },
    5: { value: 5, label: 'Customer' },
    6: { value: 6, label: 'Owner' },
    1: { value: 1, label: 'Common' },
  },

  /**地图参数**/
  //默认缩放登记
  zoom: 2,
  //默认的地图中心点
  center: {lat: 35, lng: -170},
  //true时，地图上的图标重叠时是否合并

  //点击监控界面左侧列表中的设备时， zoom小于阈值时改为该阈值

  //只显示车辆， 不显示设备
  /**地图参数**/
};
window.trkConfig=trkConfig;
