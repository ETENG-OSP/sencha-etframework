Ext.define('ETFramework.Backend', {
	requires: [
	    'Ext.Ajax'
	],
	singleton: true,

	BASE_URL: 'http://192.168.0.77',

	REQUEST_PATH: '/servlet/MobileSubmitAction',
	LOGIN_PATH: '/login/LoginSM',
	ENTRY: 'adaptPageList',
	BODY_CLASSNAME: 'et.common.vo.query.QueryVO',

	isSignIn: function () {
		if (!localStorage.username || !localStorage.password) {
			return false;
		}
		return true;
	},

	signIn: function (options) {
		options.params = options.params || {};

		Ext.Ajax.request({
			method: 'POST',
			timeout: options.timeout || 10000,
			url: options.url || (this.BASE_URL + this.LOGIN_PATH),
			disableCaching: false,
			useDefaultXhrHeader: false,
			params: {
				type: 'mobile',
				username: options.params.username,
				password: options.params.password
			},
			callback: Ext.bind(this.loginCallback, options.scope, [options.callback], true)
		});
	},

	signOut: function () {
		delete localStorage.username;
		delete localStorage.password;
	},

	request: function (options) {
		options = options || {};
		options.params = options.params || {};

		if (!this.isSignIn()) {
			console.warn('not signin');
		}

		options.params.username = localStorage.username;
		options.params.password = localStorage.password;

		Ext.Ajax.request({
			method: 'POST',
			timeout: options.timeout || 10000,
			url: options.url || (this.BASE_URL + this.REQUEST_PATH),
			disableCaching: false,
			useDefaultXhrHeader: false,
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
			if (success === '') throw new Error('connection refuse');
			if (!success) throw new Error('connection timeout');
			var reply = Ext.decode(res.responseText);
			if (!reply.success) throw new Error('no user');

			localStorage.username = req.params.username;
			localStorage.password = req.params.password;
			callback.call(this, null, reply);
		} catch (err) {
			callback.call(this, err);
		}
	}
});