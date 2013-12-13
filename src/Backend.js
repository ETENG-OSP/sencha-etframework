Ext.define('ETFramework.Backend', {
	singleton: true,

	BASE_URL: 'http://192.168.0.169',

	REQUEST_PATH: '/servlet/WebPageSubmitAction',
	LOGIN_PATH: '/login/LoginSM',
	ENTRY: 'adaptPageList',
	BODY_CLASSNAME: 'et.common.vo.query.QueryVO',

	login: function (options) {
		Ext.Ajax.request({
			method: 'POST',
			timeout: options.timeout || 10000,
			url: options.url || (this.BASE_URL + this.LOGIN_PATH),
			disableCaching: false,
			useDefaultXhrHeader: false,
			withCredentials: true,
			params: {
				type: 'mobile',
				username: options.params.username,
				password: options.params.password
			},
			callback: Ext.bind(this.loginCallback, options.scope, [options.callback], true)
		});
	},

	request: function (options) {
		Ext.Ajax.request({
			method: 'POST',
			timeout: options.timeout || 10000,
			url: options.url || (this.BASE_URL + this.REQUEST_PATH),
			disableCaching: false,
			useDefaultXhrHeader: false,
			withCredentials: true,
			params: {
				type: 'mobile',
				WebInfo_Collection: Ext.encode({
					Server_Bo_Name: options.bo,
					Server_Bo_MethodName: this.ENTRY,
					BodyClassName: this.BODY_CLASSNAME,
					DD_BillType: 'PAGE_LIST',
					params: options.params
				})
			},
			callback: Ext.bind(this.requestCallback, options.scope, [options.callback], true)
		});
	},

	requestCallback: function (req, success, res, callback) {
		try {
			if (success === '') throw new Error('connection refuse');
			if (!success) throw new Error('connection timeout');
			var reply = Ext.decode(res.responseText);
			if (!(reply.DD_Server_RetTF === 'true')) throw new Error('etframework exception');

			var args = reply.selfCollections;
			args.unshift(null);
			callback.apply(this, args);
		} catch (err) {
			callback.call(this, err);
		}
	},

	loginCallback: function (req, success, res, callback) {
		try {
			console.log(arguments);
			callback.call(this, null);
		} catch (err) {
			callback.call(this, err);
		}
	}
});