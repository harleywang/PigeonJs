/**
 * pigeon.js
 *
 * Release 1.2.0
 * @author <a href="mailto:haley.wang.vip@gmail.com">Harley Wang</a>
 * @describe  一个轻量级自定义事件或观察者模式的实现。
 */

'use strict';

(function(global, factory) {
    if (typeof exports === "object" && exports) {
        factory(exports); // CommonJS
    } else if (typeof define === "function" && define.amd) {
        define(['exports'], factory); // AMD
    } else {
        factory(global.PigeonJs = {}); // <script>
    }
}(window, function(PigeonJs) {
    var handlers = {};
    var splitStr = function(ns){
        var values = ns.split('.', 2);
        return {'type':values[0], 'key':values[1]};
    },
    clearHandlers = function(type){
        delete handlers[type];
    };
    /**
     * 添加事件
     * @param  {String} namespace   命名空间，格式必须为：type.key
     * @param  {Function} handler   触发函数
     */
    PigeonJs.addHandler = function(namespace, handler){
        var ns = splitStr(namespace);
        if(typeof handlers[ns.type] == 'undefined'){
            handlers[ns.type] = [];
        }else{
            this.removeHandler(namespace);
        }
        handlers[ns.type].push( {'unique':ns.key, 'handler':handler} );
    };
    /**
     * 移除事件
     * @param  {string} namespace    命名空间，为：type.key 或 type
     */
    PigeonJs.removeHandler = function(namespace){
        var ns = splitStr(namespace);
        if(ns.type && !ns.key){
            clearHandlers(ns.type);
        }
        else if(handlers[ns.type] instanceof Array){
            var events = handlers[ns.type];
            for(var i=0,len=events.length; i<len; i++){
                if(events[i]['unique'] == ns.key){
                    events.splice(i, 1);
                    break;
                }
            }

            if(events.length == 0){
                clearHandlers(ns.type);
            }
        }
    };
    /**
     * 触发器
     * @param  {string} namespace                                   命名空间，为：type.key 或 type
     * @param  {Object|Array|String|Boolean|Number|Function} data   要传递的数据，可选
     */
    PigeonJs.trigger = function(namespace, data){
        var ns = splitStr(namespace);

        if(handlers[ ns.type ] instanceof Array){
            var events = handlers[ns.type];
            for(var i=0,len=events.length; i<len; i++){
                if(ns.key){
                    if(events[i]['unique'] == ns.key){
                        events[i]['handler'](ns, data);
                        break;
                    }
                }else{
                    events[i]['handler'](ns, data);
                }
            }
        }
    };

}));
