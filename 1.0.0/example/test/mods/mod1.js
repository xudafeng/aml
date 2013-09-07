define('mod1',['mod2','mod3'],function(mod2,mod3){
    console.log('add mod1')
    var mod1 = function(){
        console.log('mod1');
        mod3()
        mod2()
    }
    return mod1;
});