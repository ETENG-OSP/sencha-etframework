Ext.define('ETFramework.app.Controller', {
    extend: 'Ext.app.Controller',
    requires: [
        'ETFramework.Backend'
    ],

    init: function () {
        this.setRoutes(this.configRoutes(this.getRoutes()));
        this.callParent(arguments);
    },

    configRoutes: function (routes) {
        return routes;
    },

    back: function () {
        history.back();
    },

    showView: function (xtype) {
        if (Ext.isObject(xtype)) {
            return Ext.Viewport.setActiveItem(xtype);
        };

        var view = Ext.Viewport.query(xtype)[0] || {
            xtype: xtype
        };
        return Ext.Viewport.setActiveItem(view);
    },

    request: function () {
        ETFramework.Backend.request.apply(this, arguments);
    }
});