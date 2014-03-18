ETFramework 1.0.1
============================

基础 Controller
----------------------------
ETFramework 提供的 Controller 整合了一些便利功能：
- 历史管理
- 后台调用
- 界面管理
- 路由管理

需要使用 Ext.app.Controller 时，直接继承 ETFramework.app.Controller 即可。

### 历史管理
返回上一个 url。注意，在使用 `this.getApplication().getHistory().back()` 时，仅返回上一个 action。对于 HTML 标签进行的返回无法处理。使用以下方法则没有这个问题。
```
this.back();
```

### 后台调用
作为 `ETFramework.Backend.request` 的简化写法。
```
this.request();
```

### 界面管理
显示某个页面。如果该页面之前没有实例化，则新建一个，如果已经实例化，则显示之前的。
```
this.showView(xtype)
```
xtype: String / Object
要显示页面的 xtype 或配置对象

### 路由管理
由于继承 Controller 会覆盖原有的 routes，同时，为了使用常量管理路由，提出新的模板方法进行路由配置。

例子
```
configRoutes: function (routes) {
    routes = this.callParent(arguments);
    routes[Address.MAIN] = 'handleMain';
    return routes
}
```

后台调用与身份验证
-----------------------------
现在有登录与调用两个方法。
一旦登录之后，前台会记录用户的身份。下次调用会自动登录，无需手动调用登录方法。

### 调用方法
```
ETFramework.Backend.request({
    bo: 'edu.self.TestBO',
    params: {
        hello: 'world'
    },
    callback: function (err, foo, bar) {
        console.log(foo);
        console.log(bar);
    },
    scope: this
});
```

### 登录方法
```
ETFramework.Backend.signIn({
    params: {
        username: 'tom',
        password: '123456'
    },
    callback: function (err) {
    },
    scope: this
});
```

登出
--------------------------
```
ETFramework.Backend.signOut();
```

检查登录状态
--------------------------
```
ETFramework.Backend.isSignIn();
```

错误类型
-----------------------------
- connection refused
- connection timeout
- etframework exception
- no user 
