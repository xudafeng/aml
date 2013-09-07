    /**
     * 实现松散耦合的观察者模式
     * @returns {*}
     */
    function Broadcast() {
    };

    Broadcast.cache = {};

    extend(Broadcast,{
        /**
         * 派发
         */
        fire:function(name,data){
            if(!isUndefined(this.cache[name])){
                this.cache[name].call(this,data);
            };
        },
        /**
         * 订阅
         */
        on:function(name,callback){
            this.cache[name] = callback;
        },
        /**
         * 退订
         */
        detach:function(name){
            if(!isUndefined(this.cache[name])){
                delete this.cache[name];
            };
        }
    });