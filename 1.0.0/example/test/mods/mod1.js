define('mod1',['mod2','mod3'],function(mod2,mod3){

    var mod1 = function(){
        alert('mod1');
        mod3();

        mod2();
    }
    return mod1;
});