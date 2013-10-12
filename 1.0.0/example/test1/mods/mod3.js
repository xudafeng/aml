define('mod3',[],function(){
    console.log('add mod3')
    var mod3 = function(){
        console.log('mod3')
            var xdf = require('mod4');
           // xdf();
           console.log(xdf)
    }
    return mod3;
});
