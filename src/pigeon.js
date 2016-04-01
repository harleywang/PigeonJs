/**
 * pigeon.js
 *
 * Release 1.0.0
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
        if(values.length !== 2){
            throw "namespace format error!";
        }
        return {'type':values[0], 'key':values[1]};
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
     * @param  {string} namespace    命名空间，格式必须为：type.key
     */
    PigeonJs.removeHandler = function(namespace){
        var ns = splitStr(namespace);
        if(handlers[ns.type] instanceof Array){
            var events = handlers[ns.type];
            for(var i=0,len=events.length; i<len; i++){
                if(events[i]['unique'] == ns.key){
                    events.splice(i, 1);
                    break;
                }
            }

            if(events.length == 0){
                this.clearHandlers(ns.type);
            }
        }
    };
    /**
     * 触发器
     * @param  {string} type                                        事件类型，为命令空间的前面部分
     * @param  {Object|Array|String|Boolean|Number|Function} data   要传递的数据
     */
    PigeonJs.trigger = function(type, data){
        if(handlers[type] instanceof Array){
            var events = handlers[type];
            for(var i=0,len=events.length; i<len; i++){
                events[i]['handler'](type, data);
            }
        }else{
            throw "event type error!";
        }
    };
    /**
     * 清除事件
     * @param  {string} type    事件类型，为命令空间的前面部分
     */
    PigeonJs.clearHandlers = function(type){
        delete handlers[type];
    }

}));
