/* =========================================================
   Particle network animation
   ---------------------------------------------------------
   Drifting particles connected by lines. When the cursor
   enters a container, nearby particles connect to it and
   get a light pull toward it — so the cursor visually
   "collects" and holds them.
   Runs independently inside each container it is attached
   to (currently the top header and the profile sidebar).
   ========================================================= */
(function () {
  "use strict";

  function createNetwork(container, opts) {
    if (!container) return;

    var defaults = {
      particleCount: 50,
      color: "111, 29, 27",
      maxLinkDist: 110,
      cursorMaxDist: 160,
      speed: 0.35,
      dotSize: 1.2,
      opacity: 0.85
    };
    var settings = Object.assign({}, defaults, opts || {});
    var maxLinkDistSq = settings.maxLinkDist * settings.maxLinkDist;
    var cursorMaxDistSq = settings.cursorMaxDist * settings.cursorMaxDist;

    var canvas = document.createElement("canvas");
    canvas.className = "particles-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.opacity = settings.opacity;
    container.insertBefore(canvas, container.firstChild);

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var width = 0;
    var height = 0;
    var particles = [];
    var mouse = { x: null, y: null };

    function resize() {
      var rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function seed() {
      particles.length = 0;
      for (var i = 0; i < settings.particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-settings.speed, settings.speed),
          vy: rand(-settings.speed, settings.speed)
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        ctx.fillStyle = "rgba(" + settings.color + ", 0.85)";
        ctx.fillRect(
          p.x - settings.dotSize / 2,
          p.y - settings.dotSize / 2,
          settings.dotSize,
          settings.dotSize
        );

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var distSq = dx * dx + dy * dy;
          if (distSq < maxLinkDistSq) {
            var alpha = 1 - distSq / maxLinkDistSq;
            ctx.strokeStyle = "rgba(" + settings.color + "," + (alpha * 0.6).toFixed(3) + ")";
            ctx.lineWidth = alpha * 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          var mdx = p.x - mouse.x;
          var mdy = p.y - mouse.y;
          var mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < cursorMaxDistSq) {
            var mAlpha = 1 - mDistSq / cursorMaxDistSq;

            if (mDistSq > cursorMaxDistSq * 0.25) {
              p.x -= mdx * 0.03;
              p.y -= mdy * 0.03;
            }

            ctx.strokeStyle = "rgba(" + settings.color + "," + (mAlpha * 0.9).toFixed(3) + ")";
            ctx.lineWidth = mAlpha * 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      window.requestAnimationFrame(step);
    }

    container.addEventListener("mousemove", function (e) {
      var rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    container.addEventListener("mouseleave", function () {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener("resize", function () {
      resize();
      seed();
    });

    resize();
    seed();
    window.requestAnimationFrame(step);
  }

  createNetwork(document.querySelector(".site-header"), {
    particleCount: 35,
    maxLinkDist: 120
  });

  createNetwork(document.querySelector(".profile-card"), {
    particleCount: 15,
    maxLinkDist: 100,
    cursorMaxDist: 130,
    opacity: 0.7
  });
})();
