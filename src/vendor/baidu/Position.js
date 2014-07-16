Ext.define('ETFramework.vendor.baidu.Position', {
  alias: 'position.baidu',

  createPosition: function (config) {
    return new BMap.Point(config.longitude, config.latitude);
  }

});