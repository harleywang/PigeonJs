PigeonJs
=====

`PigeonJs` 是一个轻量级自定义事件或观察者模式的实现。

####特点：

* 小巧，不依赖任何`lib`
* 单例模式实现，任意地方可添加订阅，移除订阅，清除事件类型；
* 移除订阅只需通过`namespace`命令空间，因为有时添加订阅和移除阅订不在一个作用域下, 这样会带来极大的方便；
* 安全的`handlers`事件存储，不会被无意中覆盖；



####NameSpace格式：


`type.key` : type为事件的类型，key为订阅的唯一标识符



####Example：

```
// 添加订阅
PigeonJs.addHandler('undc.wanghailiang', function(ns, event){
    console.log(ns, event.message, 'My key is wanghailiang');
});

// 添加订阅
PigeonJs.addHandler('undc.ouyi', function(ns, event){
    console.log(ns, event.message, 'My key is ouyi');
});

// 触发
PigeonJs.trigger('undc', {message:"Hello PigeonJs!"});

// 移除订阅
PigeonJs.removeHandler('undc.wanghailiang');

// 清除整个事件类型
PigeonJs.clearHandlers('undc');

```
