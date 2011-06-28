var all = require("../all");

exports["test all() function executes all functions"] = function(test){
  var fn1_executed = false,
    fn2_executed = false;

  var fn1 = function(done){
    fn1_executed = true;
    done();
  }

  var fn2 = function(done){
    fn2_executed = true;
    done();
  }

  all([fn1, fn2], function(error){
    test.ok(!error, "Shouldn't have errored"); 
    test.ok(fn1_executed && fn2_executed, "Should have executed both fn1 and fn2");
    test.done();
  });
};

exports["test all() function passes arguments to functions"] = function(test){
  var fn1 = function(done, a, b){
    test.ok(a == 1);
    test.ok(b == 2);
    done();
  }

  all([fn1], function(error){
    test.done();
  }, [1, 2]);
};

exports["test all() function handles error callbacks successfully"] = function(test){
  var fn1 = function(done){
    done("Error 1");
  }

  var fn2 = function(done){
    done("Error 2");
  }

  all([fn1, fn2], function(error){
    test.ok(error.length == 2);
    test.ok(error[0] == "Error 1");
    test.ok(error[1] == "Error 2");

    test.done();
  });
};
