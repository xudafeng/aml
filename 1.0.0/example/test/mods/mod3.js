define('mod3',[],function(){
    console.log('add mod3')
    var mod3 = function(){
        console.log('mod3')
        setTimeout(function(){
            require('mod4');
        },5000)
    }
    return mod3;
});
