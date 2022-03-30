const container = document.querySelector("#container");

let lost = 0;
let score = 0;

const topBar = document.createElement("div");
topBar.classList.add("top-bar");
topBar.innerHTML = `
<h2>Score: ${score}</h2>
<h2>Lost: ${lost}</h2>
`;
container.append(topBar);

const explosionSound = document.createElement("audio");
explosionSound.src = "./sound/explod.mp3";
explosionSound.setAttribute("controls", "none");
explosionSound.setAttribute("preload", "auto");
explosionSound.style.display = "none";

container.append(explosionSound);

container.addEventListener("click", (e) => {
  const ball = document.createElement("div");

  ball.classList.add("ball");

  ball.style.left = e.clientX - 15 + "px";

  ball.style.top = e.clientY - 20 + "px";

  container.append(ball);
  move(ball);
});

function move(ball) {
  console.log(container.offsetHeight);

  let startTop = ball.offsetTop;

  const pid = setInterval(() => {
    const containerHeight = container.offsetHeight;
    startTop += 5;
    ball.style.top = startTop + "px";

    if (containerHeight - 40 <= startTop) {
      clearInterval(pid);

      ball.style.backgroundImage = "url('../image/explod.png')";

      explosionSound.pause();
      explosionSound.currentTime = 0;
      explosionSound.play();

      setTimeout(() => {
        ball.remove();
      }, 1000);
    }
  }, 15);
}

setInterval(() => {
  const tank = document.createElement("div");
  tank.classList.add("tank");
  container.append(tank);
  moveTank(tank);
}, 1000);

function moveTank(panzer) {
  let left = 0;
  const pid = setInterval(() => {
    const containerWidth = container.offsetWidth;
    left += 5;
    panzer.style.left = left + "px";
    if (left >= containerWidth) {
      clearInterval(pid);
      panzer.remove();
      lost++;
      topBar.children[1].textContent = `Lost: ${lost}`;
    }

    const ballArray = Array.from(document.querySelectorAll(".ball"));
    ballArray.forEach((ball) => {
      if (
        ball.offsetTop + 40 >= panzer.offsetTop &&
        ((ball.offsetLeft >= panzer.offsetLeft &&
          ball.offsetLeft <= panzer.offsetLeft + 70) ||
          (ball.offsetLeft + 30 >= panzer.offsetLeft &&
            ball.offsetLeft + 30 <= panzer.offsetLeft + 70))
      ) {
        if (!ball.style.backgroundImage.includes("explod")) {
          ball.remove();
          clearInterval(pid);
          panzer.remove();
          score++;
          topBar.children[0].textContent = `Score: ${score}`;
        }
      }
    });
  }, 20);
}
