var lockcall = require("../lockcall");

exports["should call with lock"] = function(test){
  var resource = new Object;
  var t = 0;

  function fn1(done){
    setTimeout(function(){
      test.ok(t == 0); // t should not have been modified by fn4
      t = 1;
      done();
    }, 100);
  }

  function fn2(done){
    test.ok(t == 1); // This should execute only after fn1 is done.
    t = 2;
    done();
  }

  lockcall(fn1, resource);
  lockcall(fn2, resource, function(){ 
    test.done(); 
  });
}
