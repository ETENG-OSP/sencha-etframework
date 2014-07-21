Ext.define('ETFramework.vendor.baidu.Map', {
  extend: 'ETFramework.feature.Map',
  xtype: 'baidumap',

  requires: [
    'ETFramework.vendor.baidu.Position'
  ],

  config: {
    position: 'baidu',
    navigationControl: false,
    scaleControl: false,
    overviewMapControl: false,
    MapTypeControl: false
  },

  initMap: function () {
    var id = this.element.id;
    console.log('6. now you can new Map()');

    var map = this.__map = new BMap.Map(id);
    var point = new BMap.Point(this.getLongitude(), this.getLatitude());

    map.enableScrollWheelZoom();

    if (this.getNavigationControl()) {
      this.__navigationControl = new BMap.NavigationControl();
      map.addControl(this.__navigationControl);
    }

    if (this.getScaleControl()) {
      this.__scaleControl = new BMap.ScaleControl();
      map.addControl(this.__scaleControl);
    }

    if (this.getOverviewMapControl()) {
      map.addControl(new BMap.OverviewMapControl());
    }

    if (this.getMapTypeControl()) {
      map.addControl(new BMap.MapTypeControl());
    }

    map.centerAndZoom(point, this.getLevel());

    this.addMarkers(this.getMarkers());
  },

  __addMarker: function (longitude, latitude) {
    var point = new BMap.Point(longitude, latitude);
    var marker = new BMap.Marker(point);
    this.__map.addOverlay(marker);
  },

  clear: function () {
    this.__map.clearOverlays();
  },

  center: function (longitude, latitude) {
    this.__map.panTo(new BMap.Point(longitude, latitude));
  },

  statics: {
    url: 'http://api.map.baidu.com/api',
    query: {
      v: '2.0',
      ak: 'Ivgr94UBpL6zkp4lUZRtQCys'
    }
  }

}, function () {
  this.loadApi();
});
