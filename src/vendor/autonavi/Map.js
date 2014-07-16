Ext.define('ETFramework.vendor.autonavi.Map', {
  extend: 'ETFramework.feature.Map',
  xtype: 'amap',

  requires: [
    'ETFramework.vendor.autonavi.Position'
  ],

  config: {
    position: 'autonavi'
  },

  initMap: function () {
    var id = this.element.id;
    var map = this.__map = new AMap.Map(id, {
      center: this.createPosition(this.getLatitude(), this.getLongitude()),
      level: this.getLevel()
    });

    this.addMarkers(this.getMarkers());
  },

  __addMarker: function (longitude, latitude) {
    var marker = new AMap.Marker({
      map: this.__map,
      position: this.createPosition({
        longitude: longitude,
        latitude: latitude
      })
    });
  },

  clear: function () {
    this.__map.clearMap();
    return this;
  },

  center: function (longitude, latitude) {
    this.__map.setCenter(this.createPosition({
      longitude: longitude,
      latitude: latitude
    }));
    return this;
  },

  // ====== amap shim =======

  initialize: function () {
    this.callParent(arguments);
    Ext.Viewport.on('amaploaded', this.onAMapLoaded, this, {
      single: true
    });
  },

  onAMapLoaded: function () {
    Ext.getClass(this).onMapLoaded();
  },

  statics: {
    url: 'http://webapi.amap.com/maps',
    query: {
      v: '1.2',
      key: '3390ee8f0b3a0aff284cf0b889176233'
    },

    buildUrl: function () {
      var query = this.query;
      query.callback = 'AMapCallback';
      return this.url + '?' + Ext.Object.toQueryString(query);
    }
  }

}, function () {
  this.loadApi();
});

function AMapCallback() {
  Ext.Viewport.fireEvent('amaploaded');
}
