define('mod3',[],function(){
    console.log('add mod3')
    var mod3 = function(){
        console.log('mod3')
        setTimeout(function(){
            var xuyao = require('mod4');
            console.log(xuyao)
        },5000)
    }
    return mod3;
});