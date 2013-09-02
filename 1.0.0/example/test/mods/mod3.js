define('mod3',['mod1','mod2'],function(mod1,mod2){
    var mod3 =function(){
        console.log(mod1+mod2)
    };
    return mod3;
});