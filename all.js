/**
 * Execute an array of functions, execute callback function after all were
 * executed. `fns` is an array of functions, which must take a callback function
 * as its first argument. Subsequent arguments can be passed to each function 
 * with the `args` argument.
 * 
 * After a function executes, it should call its callback function with the first
 * parameter containing an error if it failed, or false if successful.
 * 
 *  function fn1(done){
 *    done("An error occurred"); 
 *  } 
 * 
 *  function fn2(done){
 *    done(); //Success
 *  }
 *
 *  all([fn1, fn2], function(err){
 *    if(err){
 *      console.log("Ran into ", err.length, "errors");
 *    }else{
 *      console.log("No errors");
 *    }
 *  }
 * 
 * @param {Array} fns
 * @param {Function} callback
 * @param {Array} args
 */

module.exports = exports = function all(fns, callback, args){
  if(fns.length == 0){
    callback([]);
    return;
  }

  var success = 0, 
    failed = [];

  function trigger(err){
    if(!err){
      success++;
    }else{
      failed.push(err);
    }

    if((success + failed.length) == fns.length){
      if(failed.length > 0){
        callback(failed);
      }else{
        callback();
      }
    }
  }

  for(var i=0;i<fns.length;i++){
    var largs = [trigger].concat(args);
    fns[i].apply(this, largs);
  }
}

