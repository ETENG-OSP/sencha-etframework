Ext.define('ETFramework.util.Uuid', {
  extend: 'Ext.data.identifier.Uuid',
  singleton: true,
  alternateClassName: 'uuid',
  
  v4: function () {
    this.setVersion(4);
    return this.generate();
  },

  v1: function () {
    this.setVersion(1);
    return this.generate();
  }
});