define('mod3',['mod1','mod2'],function(mod1,mod2){
    mod1();
    mod2();
    return 'mod3';
});