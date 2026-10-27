(() => {
  "use strict";

  const RAPID_CLICK_COUNT = 5;
  const CLICK_GAP = 480;
  const BOARD_CELLS = 20;
  const CELL_SIZE = 16;
  const INITIAL_SPEED = 130;

  function initializeSnakeGame() {
    const modal = document.querySelector("[data-snake-game]");
    const triggers = document.querySelectorAll("[data-snake-trigger]");

    if (!modal || triggers.length === 0) return;

    const canvas = modal.querySelector("[data-snake-canvas]");
    const context = canvas.getContext("2d");
    const scoreElement = modal.querySelector("[data-snake-score]");
    const bestElement = modal.querySelector("[data-snake-best]");
    const message = modal.querySelector("[data-snake-message]");
    const messageTitle = modal.querySelector("[data-snake-message-title]");
    const messageCopy = modal.querySelector("[data-snake-message-copy]");
    const pauseButton = modal.querySelector("[data-snake-pause]");

    let rapidClicks = 0;
    let clickTimer = null;
    let previousClick = 0;
    let previousFocus = null;
    let snake = [];
    let food = { x: 0, y: 0 };
    let direction = { x: 1, y: 0 };
    let queuedDirection = { x: 1, y: 0 };
    let score = 0;
    let best = loadBestScore();
    let speed = INITIAL_SPEED;
    let loopTimer = null;
    let running = false;
    let paused = false;
    let awaitingInput = false;

    bestElement.textContent = formatScore(best);

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        const now = Date.now();

        if (now - previousClick > CLICK_GAP) rapidClicks = 0;

        rapidClicks += 1;
        previousClick = now;
        window.clearTimeout(clickTimer);

        if (rapidClicks >= RAPID_CLICK_COUNT) {
          rapidClicks = 0;
          openGame(trigger);
          return;
        }

        clickTimer = window.setTimeout(() => {
          rapidClicks = 0;
          window.location.assign(trigger.href);
        }, CLICK_GAP);
      });
    });

    modal.querySelectorAll("[data-snake-close]").forEach((button) => {
      button.addEventListener("click", closeGame);
    });

    modal.querySelector("[data-snake-restart]").addEventListener("click", resetGame);
    pauseButton.addEventListener("click", togglePause);

    modal.querySelectorAll("[data-snake-direction]").forEach((button) => {
      button.addEventListener("click", () => changeDirection(button.dataset.snakeDirection));
    });

    document.addEventListener("keydown", (event) => {
      if (modal.hidden) return;

      const keyDirections = {
        ArrowUp: "up",
        w: "up",
        W: "up",
        ArrowDown: "down",
        s: "down",
        S: "down",
        ArrowLeft: "left",
        a: "left",
        A: "left",
        ArrowRight: "right",
        d: "right",
        D: "right"
      };

      if (keyDirections[event.key]) {
        event.preventDefault();
        changeDirection(keyDirections[event.key]);
      } else if (event.key === " " || event.key === "p" || event.key === "P") {
        event.preventDefault();
        togglePause();
      } else if (event.key === "Escape") {
        closeGame();
      }
    });

    function openGame(trigger) {
      window.clearTimeout(clickTimer);
      previousFocus = trigger;
      modal.hidden = false;
      document.body.classList.add("snake-game-open");
      resetGame();
      modal.querySelector("[data-snake-close]").focus();
    }

    function closeGame() {
      stopLoop();
      modal.hidden = true;
      document.body.classList.remove("snake-game-open");
      previousFocus?.focus();
    }

    function resetGame() {
      stopLoop();
      snake = [
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 },
        { x: 5, y: 10 }
      ];
      direction = { x: 1, y: 0 };
      queuedDirection = { x: 1, y: 0 };
      score = 0;
      speed = INITIAL_SPEED;
      paused = false;
      awaitingInput = true;
      running = true;
      pauseButton.textContent = "●";
      pauseButton.setAttribute("aria-label", "Pause game");
      placeFood();
      updateScore();
      draw();
      showMessage("Ready?", "Press any direction to begin");
    }

    function scheduleTick() {
      if (!running || paused) return;
      loopTimer = window.setTimeout(tick, speed);
    }

    function tick() {
      direction = queuedDirection;
      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      };

      const hitWall = head.x < 0 || head.x >= BOARD_CELLS || head.y < 0 || head.y >= BOARD_CELLS;
      const hitSelf = snake.some((segment) => segment.x === head.x && segment.y === head.y);

      if (hitWall || hitSelf) {
        endGame();
        return;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score += 10;
        speed = Math.max(70, INITIAL_SPEED - Math.floor(score / 50) * 8);
        updateScore();
        placeFood();
      } else {
        snake.pop();
      }

      draw();
      scheduleTick();
    }

    function changeDirection(name) {
      const vectors = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 }
      };
      const candidate = vectors[name];

      if (!candidate || candidate.x === -direction.x && candidate.y === -direction.y) return;

      queuedDirection = candidate;

      if (awaitingInput) {
        awaitingInput = false;
        message.hidden = true;
        scheduleTick();
      }
    }

    function togglePause() {
      if (!running) {
        resetGame();
        return;
      }

      if (awaitingInput) {
        awaitingInput = false;
        message.hidden = true;
        scheduleTick();
        return;
      }

      paused = !paused;
      window.clearTimeout(loopTimer);
      pauseButton.textContent = paused ? "▶" : "●";
      pauseButton.setAttribute("aria-label", paused ? "Resume game" : "Pause game");

      if (paused) {
        showMessage("Paused", "Press the center key or space to continue");
      } else {
        message.hidden = true;
        scheduleTick();
      }
    }

    function endGame() {
      running = false;
      awaitingInput = false;
      stopLoop();

      if (score > best) {
        best = score;
        saveBestScore(best);
        bestElement.textContent = formatScore(best);
      }

      showMessage("Game over", `Final score: ${formatScore(score)}`);
    }

    function stopLoop() {
      running = false;
      window.clearTimeout(loopTimer);
    }

    function placeFood() {
      do {
        food = {
          x: Math.floor(Math.random() * BOARD_CELLS),
          y: Math.floor(Math.random() * BOARD_CELLS)
        };
      } while (snake.some((segment) => segment.x === food.x && segment.y === food.y));
    }

    function updateScore() {
      scoreElement.textContent = formatScore(score);
    }

    function showMessage(title, copy) {
      messageTitle.textContent = title;
      messageCopy.textContent = copy;
      message.hidden = false;
    }

    function draw() {
      context.fillStyle = "#aeb998";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = "rgba(39, 51, 42, 0.08)";
      context.lineWidth = 1;
      for (let index = 0; index <= BOARD_CELLS; index += 1) {
        const offset = index * CELL_SIZE + 0.5;
        context.beginPath();
        context.moveTo(offset, 0);
        context.lineTo(offset, canvas.height);
        context.stroke();
        context.beginPath();
        context.moveTo(0, offset);
        context.lineTo(canvas.width, offset);
        context.stroke();
      }

      context.fillStyle = "#27332a";
      snake.forEach((segment, index) => {
        const inset = index === 0 ? 1 : 2;
        context.fillRect(
          segment.x * CELL_SIZE + inset,
          segment.y * CELL_SIZE + inset,
          CELL_SIZE - inset * 2,
          CELL_SIZE - inset * 2
        );
      });

      context.beginPath();
      context.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
      );
      context.fill();
      context.strokeStyle = "#aeb998";
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 4,
        0,
        Math.PI * 2
      );
      context.stroke();
    }

    function formatScore(value) {
      return String(value).padStart(3, "0");
    }

    function loadBestScore() {
      try {
        return Number.parseInt(window.localStorage.getItem("wachh-snake-best") || "0", 10);
      } catch (_error) {
        return 0;
      }
    }

    function saveBestScore(value) {
      try {
        window.localStorage.setItem("wachh-snake-best", String(value));
      } catch (_error) {
        // The game remains playable when storage is unavailable.
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSnakeGame);
  } else {
    initializeSnakeGame();
  }
})();
