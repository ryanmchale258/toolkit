(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x<vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
 
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
 
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());

var elem = document.getElementById('my-element'),
    startTime = null,
    endPos = 500, // in pixels
    duration = 2000; // in milliseconds
 
function render(time) {
  if (time === undefined) {
    time = new Date().getTime();
  }
  if (startTime === null) {
    startTime = time;
  }
 
  elem.style.left = ((time - startTime) / duration * endPos % endPos) + 'px';
}
 
elem.onclick = function() {
  (function animationLoop(){
    render();
    requestAnimationFrame(animationLoop, elem);
  })();
};