Ext.define('ETFramework.feature.Map', {
  extend: 'Ext.Component',
  xtype: 'etmap',
  config: {
    latitude: 39.915,
    longitude: 116.404,
    level: 14,
    markers: [{
      latitude: 39.915,
      longitude: 116.404,
    }]
  },

  // --- interface ---
  addMarkers: function () {
    if (Array.isArray(arguments[0])) {
      Ext.Array.forEach(arguments[0], function (marker) {
        this.__addMarker(marker.longitude, marker.latitude);
      }, this);
    }
  },

  createPosition: function (config) {
    if (Ext.isObject(config)) {
      return this.positionFactory.createPosition(config);
    }

    return this.positionFactory.createPosition({
      latitude: arguments[0],
      longitude: arguments[1]
    });
  },

  // --- abstruct ---

  address: Ext.emptyFn,
  __addMarker: Ext.emptyFn,
  clear: Ext.emptyFn,
  center: Ext.emptyFn,

  //
  inheritableStatics: {
    isMapLoaded: function () {
      return this.__mapLoaded;
    },

    paddingInstance: function (instance) {
      this.__paddingInstances.push(instance);
    },

    clearQueue: function () {
      this.__paddingInstances = [];
    },

    onApiLoaded: function () {
      this.onload = null;
      console.log('2. api loader has been loaded');
    },

    onMapLoaded: function () {
      console.log('3. map has been loaded');
      this.__mapLoaded = true;

      Ext.Array.forEach(this.__paddingInstances, function (instance) {
        instance.initMap();
      });
      this.clearQueue();
    },

    buildUrl: function () {
      var query = this.query;
      query.callback = Ext.getClassName(this) + '.onMapLoaded';
      return this.url + '?' + Ext.Object.toQueryString(query);
    },

    loadApi: function () {
      this.__paddingInstances = [];
      this.__mapLoaded = false;

      console.log('1. load sencha touch class');

      var url = this.buildUrl();

      console.log(url);
      var script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = this.onApiLoaded;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },

  initialize: function () {
    console.log('4. instance has been created');
    this.callParent(arguments);
    this.on('painted', this.prepareInit, this);
    this.positionFactory = Ext.createByAlias('position.' + this.getPosition());
  },

  prepareInit: function () {
    console.log('5. instance has been painted');

    var loader = Ext.getClass(this);

    if (!loader.isMapLoaded()) {
      console.log('delay init');
      loader.paddingInstance(this);
      return;
    }
    this.initMap();
  }
});