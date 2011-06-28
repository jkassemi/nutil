/**
 * Executes function under the scope of a resource lock, such that the function
 * will not execute while another function is operating on the resource. 
 * 
 *  var important_resource;
 * 
 *  function fn1(done){
 *    modify(important_resource);
 *    done(); 
 *  } 
 * 
 *  function fn2(done){
 *    modify(important_resource);
 *    done(); //Success
 *  }
 *
 *  lockcall(fn1, important_resource);
 *  lockcall(fn2, important_resource, function(){
 *    console.log("modifications to resource were made, sequentially");
 *  });
 * 
 * @param {Array} fns
 * @param {Object} resource
 * @param {Function} callback
 */

var resource_call_queue = {};

module.exports = exports = function lockcall(fn, resource, callback){
  if(!resource_call_queue[resource]){
    resource_call_queue[resource] = [];
  }    

  resource_call_queue[resource].push(function(){
    fn(function(){
      // Remove self from the queue.
      resource_call_queue[resource].shift();

      if(callback){
        callback();
      }

      if(resource_call_queue[resource].length > 0){
        // Call the next function
        resource_call_queue[resource][0]();
      }
    });
  });

  if(resource_call_queue[resource].length == 1){
    resource_call_queue[resource][0]();
  }
}
