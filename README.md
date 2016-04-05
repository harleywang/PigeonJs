PigeonJs
=====

`PigeonJs` 是一个轻量级自定义事件或观察者模式的实现。

#### 特点：

* 小巧，不依赖任何`lib`
* 单例模式实现，任意地方可添加订阅，移除订阅，清除事件类型；
* 支持单事件触发和群组触发，单事件移除和群组移除；
* 移除订阅只需通过`namespace`命令空间，因为有时添加订阅和移除阅订不在一个作用域下, 这样会带来极大的方便；
* 安全的`handlers`事件存储，不会被无意中覆盖；


#### NameSpace格式：

`type.key` : `type` 为事件的类型，表示群组；`key` 为订阅的唯一标识符
> 注意：不支持多层命名空间（例如：uxdc.haleywang.age），第二层后面的部分会被忽略掉


#### Example：

```javascript

// 添加订阅
PigeonJs.addHandler('uxdc.haleywang', function(ns, event){
    console.log(ns, event.message, '我是haleywang，收到!');
});

// 添加订阅
PigeonJs.addHandler('uxdc.ice', function(ns, event){
    console.log(ns, event.message, '我是ice，收到!');
});

// 添加订阅
PigeonJs.addHandler('uxdc.ouyi', function(ns, event){
    console.log(ns, event.message, '我是ouyi，收到!');
});


// 触发
PigeonJs.trigger('uxdc.ouyi', {message:"2:00 来duang2会议室开会!"});
PigeonJs.trigger('uxdc.haleywang', {message:"4:00 上线!"});
PigeonJs.trigger('uxdc.ice', {message:"带个早点上楼!"});

// 触发群组
PigeonJs.trigger('uxdc', {message:"@all：明天放假一天!"});

// 移除订阅
PigeonJs.removeHandler('uxdc.haleywang');
// 触发群组
PigeonJs.trigger('uxdc', {message:"@all：发周报!"});

// 移除群组
PigeonJs.removeHandler('uxdc');

```

#### 在React中使用：
使用 `PigeonJs` 在组件之间进行通讯或数据共享：

```javascript
// 快捷菜单
var ShortcutMenu = React.createClass({
    getInitialState: function() {
        return {selected: this.props.selected};
    },
    show: function(){
        this.refs.shortcut_menu.style.display = 'block';
    },
    hide: function(){
        this.refs.shortcut_menu.style.display = 'none';
    },
    componentDidMount: function(){
        var that = this;
        PigeonJs.addHandler('ShortcutMenu.onShow', function(ns, event){
            that.show();
        });
    },
    componentWillUnmount: function(){
        PigeonJs.removeHandler('ShortcutMenu.onShow');
    },
    render: function() {
        return (
            <div ref="shortcut_menu" className="shortcut_menu"></div>
        );
    }
});
ReactDOM.render(<ShortcutMenu />, document.getElementById('shortcut_menu'));
```

在其它组件中触发：

```javascript
// 更多快捷菜单
onMore: function(e){
    PigeonJs.trigger('ShortcutMenu.onShow');
}
```
