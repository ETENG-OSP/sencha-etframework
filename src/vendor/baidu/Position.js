Ext.define('ETFramework.vendor.baidu.Position', {
  requires: [
    'ETFramework.util.EvilTransform'
  ],
  
  alias: 'position.baidu',

  createPosition: function (config) {
    return new BMap.Point(config.longitude, config.latitude);
  }

});
