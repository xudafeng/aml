define('mod2',['mod3'],function(){
    console.log('add mod2')
    var mod2 = function(){
        console.log('mod2');
    };
    return mod2;
});