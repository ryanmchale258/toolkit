(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();


var leafs = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    leafcount = 125,
    mX = -100,
    mY = -100

    canvas.width = window.innerWidth;

      var img = new Image();
      img.src = 'leaf.png';

function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < leafcount; i++) {
        var leaf = leafs[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = leaf.x,
            y2 = leaf.y;

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2;

            leaf.velX -= deltaV * xcomp;
            leaf.velY -= deltaV * ycomp;

        } else {
            leaf.velX *= .98;
            if (leaf.velY <= leaf.speed) {
                leaf.velY = leaf.speed
            }
            leaf.velX += Math.cos(leaf.step += .05) * leaf.stepSize;
        }

        ctx.fillStyle = "rgba(255,255,255," + leaf.opacity + ")";
        leaf.y += leaf.velY;
        leaf.x += leaf.velX;

        if (leaf.y >= canvas.height || leaf.y <= 0) {
            reset(leaf);
        }


        if (leaf.x >= canvas.width || leaf.x <= 0) {
            reset(leaf);
        }
        ctx.drawImage(img, leaf.x, leaf.y, leaf.size, leaf.size);
        ctx.globalAlpha = leaf.opacity;
  


        

    }
    requestAnimationFrame(snow);
};

function reset(leaf) {
    leaf.x = Math.floor(Math.random() * canvas.width);
    leaf.y = 0;
    leaf.size = (Math.random() * 5) + 25;
    leaf.speed = (Math.random() * 1) + 0.5;
    leaf.velY = leaf.speed;
    leaf.velX = 0;
    leaf.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
    for (var i = 0; i < leafcount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 5) + 25,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

        leafs.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random()) / 30,
            step: 0,
            angle: 180,
            opacity: opacity
        });
    }

    snow();
};

canvas.addEventListener("mousemove", function(e) {
    mX = e.clientX,
    mY = e.clientY
});

window.addEventListener("load", init);


function resize() {
    canvas.width = window.innerWidth;
}


window.addEventListener("resize", resize);