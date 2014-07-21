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

  polyline: function (positions) {
    var map = this.__map;

    var path = Ext.Array.map(positions, function (position) {
      return this.createPosition(position);
    }, this);

    console.log(path);

    var polyline = new AMap.Polyline({
      map: map,
      path: path
    });
  },

  center: function (longitude, latitude) {
    this.__map.setCenter(this.createPosition({
      longitude: longitude,
      latitude: latitude
    }));
    return this;
  },

  address: function (longitude, latitude, callback){
	  var self = this;
	  this.__map.plugin(['AMap.Geocoder'], function () {
		  var encoder = new AMap.Geocoder();
		  encoder.getAddress(self.createPosition({
			  longitude: longitude,
			  latitude: latitude
		  }));
		  AMap.event.addListener(encoder, 'complete', function (result) {
			  var reply = {
          building: result.regeocode.addressComponent.building,
          city: result.regeocode.addressComponent.city,
          district: result.regeocode.addressComponent.district,
          neighborhood: result.regeocode.addressComponent.neighborhood,
          province: result.regeocode.addressComponent.province,
          street: result.regeocode.addressComponent.street,
          streetNumber: result.regeocode.addressComponent.streetNumber,
          township: result.regeocode.addressComponent.township,
			  };
			  callback(reply);
		  });
	  });
  },

  // ====== amap shim =======
  statics: {
    url: 'http://webapi.amap.com/maps',
    query: {
      v: '1.3',
      key: '3390ee8f0b3a0aff284cf0b889176233'
    },

    buildUrl: function () {
      var query = this.query;
      query.callback = 'AMapCallback';
      return this.url + '?' + Ext.Object.toQueryString(query);
    }
  }

}, function () {

  Ext.Viewport.on('amaploaded', function () {
    this.onMapLoaded();
  }, this, {
    single: true
  });

  this.loadApi();

});

function AMapCallback() {
  Ext.Viewport.fireEvent('amaploaded');
}
