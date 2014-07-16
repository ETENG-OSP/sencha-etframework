Ext.define('ETFramework.vendor.autonavi.Position', {
  requires: [
    'ETFramework.util.EvilTransform'
  ],

  alias: 'position.autonavi',

  createPosition: function (config) {
    var coords = {
      lng: config.longitude,
      lat: config.latitude
    };
    if (config.transform) {
      coords = eviltransform.wgs2gcj(config.latitude, config.longitude);
    }
    return new AMap.LngLat(coords.lng, coords.lat);
  }

});