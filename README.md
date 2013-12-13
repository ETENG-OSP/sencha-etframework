后台用法
=============================

现在有登录与调用两个方法。
一旦登录之后，前台会记录用户的身份。下次调用会自动登录，无需手动调用登录方法。

调用方法
-----------------------------
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

登录方法
-----------------------------
```
ETFramework.Backend.login({
    params: {
        username: 'tom',
        password: '123456'
    },
    callback: function (err) {
    },
    scope: this
});
```

错误类型
-----------------------------
 - connection refused
 - connection timeout
 - etframework exception
