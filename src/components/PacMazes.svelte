<script>
  import Player from './Player.svelte';
  import Ghost from './Ghost.svelte';
  import { onMount } from 'svelte';

  let showMessage = false;
  let showCongratulations = false;
  let currentLevel = 1;


  let gridSize;
  let playerPosition;
  let targetPosition;
  let ghosts = [];
  let maze;
  let touchStart = null;
  let ghostInterval;

  const mazes = [
    // Level 1 Maze
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
        // Level 2 Maze
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
        // Level 3 Maze
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  ];

  function resetGame() {
    clearInterval(ghostInterval);
    startLevel(1);
  }

  function startLevel(level) {

    if (level < 1 || level > mazes.length) {
      alert('Invalid level number');
      return;
    }

    maze = mazes[level - 1];
    let gridSize = maze.length;

    // Check if all elements of maze are of equal length as gridSize
    for (let i = 0; i < maze.length; i++) {
      if (maze[i].length !== gridSize) {
      alert(`Invalid maze dimensions in maze ${currentLevel}, line ${i + 1}`);
      return;
      }
    }

    // Player always starts in upper left corner
    playerPosition = { x: 1, y: 1 };

    // Ghost always starts in a random position
    ghosts = [];
    const initialPositions = [
      { x: Math.floor(Math.random() * (gridSize - 2)) + 1, y: Math.floor(Math.random() * (gridSize - 2)) + 1 },
      { x: Math.floor(Math.random() * (gridSize - 2)) + 1, y: Math.floor(Math.random() * (gridSize - 2)) + 1 },
      { x: Math.floor(Math.random() * (gridSize - 2)) + 1, y: Math.floor(Math.random() * (gridSize - 2)) + 1 },
    ];

    for (let i = 0; i < level; i++) {
      ghosts.push({
        position: initialPositions[i],
        currentDirection: null,
        previousPosition: null
      });
    }

    // Target position always downer right corner
    targetPosition = { x: gridSize - 2, y: gridSize - 2 };

    currentLevel = level;

    // Clear any existing interval before starting a new one
    if (ghostInterval) clearInterval(ghostInterval);
    ghostInterval = setInterval(moveGhosts, 1000 / currentLevel); // Move ghosts every second

    return () => clearInterval(ghostInterval);
  }

  // Dispatched from Player.svelte
  function handleMove(event) {
    let direction = event.detail;
    let newPosX = playerPosition.x + direction.x;
    let newPosY = playerPosition.y + direction.y;

    if (maze[newPosY][newPosX] === 0) {
      playerPosition = { x: newPosX, y: newPosY };
    }
    checkWinCondition();
    checkCollision();
  }

  function handleClick(event) {
  // Access the clicked element
  const target = event.target;

  // Get the grid-row and grid-column styles
  const gridRow = target.style.gridRowStart || target.style.gridRow;
  const gridColumn = target.style.gridColumnStart || target.style.gridColumn;

  // Extract the row and column indices (subtracting 1 to get zero-based index)
  const y = parseInt(gridRow) - 1;
  const x = parseInt(gridColumn) - 1;

  console.log('Grid Coordinates:', x, y);

  // Proceed with your logic to move the player if the cell is adjacent and open
  const dx = Math.abs(x - playerPosition.x);
  const dy = Math.abs(y - playerPosition.y);

  // Allow move only if the clicked cell is adjacent and open
  if ((dx === 1 && dy === 0 || dx === 0 && dy === 1) && maze[y][x] === 0) {
    playerPosition = { x, y };
    checkWinCondition();
    checkCollision();
  }
}

function handleTouchStart(event) {
    // Access the touched element
    const target = event.target;

    // Get the grid-row and grid-column styles
    const gridRow = target.style.gridRowStart || target.style.gridRow;
    const gridColumn = target.style.gridColumnStart || target.style.gridColumn;

    // Extract the row and column indices (subtracting 1 to get zero-based index)
    const y = parseInt(gridRow) - 1;
    const x = parseInt(gridColumn) - 1;

    // Store the starting position
    touchStart = { x, y };
  }

  function handleTouchMove(event) {
    if (!touchStart) return;

    // Access the touched element during move
    const target = document.elementFromPoint(
      event.touches[0].clientX,
      event.touches[0].clientY
    );

    if (!target) return;

    // Get the grid-row and grid-column styles
    const gridRow = target.style.gridRowStart || target.style.gridRow;
    const gridColumn = target.style.gridColumnStart || target.style.gridColumn;

    // Extract the row and column indices (subtracting 1 to get zero-based index)
    const y = parseInt(gridRow) - 1;
    const x = parseInt(gridColumn) - 1;

    const dx = Math.abs(x - touchStart.x);
    const dy = Math.abs(y - touchStart.y);

    // Allow move only if dragging to an adjacent cell
    if ((dx === 1 && dy === 0 || dx === 0 && dy === 1) && maze[y][x] === 0) {
      playerPosition = { x, y };
      touchStart = { x, y }; // Update the start position for continued dragging
      checkWinCondition();
      checkCollision();
    }
  }

  function handleTouchEnd() {
    touchStart = null; // Reset on touch end
  }
  
  function moveGhosts() {
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 },  // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 }   // Right
    ];

    function isValidMove(position, dir) {
      const newX = position.x + dir.x;
      const newY = position.y + dir.y;
      return maze[newY] && maze[newY][newX] === 0;
    }

    ghosts.forEach(ghost => {
      const validMoves = directions.filter(dir => isValidMove(ghost.position, dir));
      let changeDirection = false;

      if (validMoves.length > 0) {
        const baseProbability = 0.15;
        const totalProbability = baseProbability * validMoves.length;

        const previousDirection = ghost.currentDirection
          ? { x: -ghost.currentDirection.x, y: -ghost.currentDirection.y }
          : null;

        const isReturning = ghost.previousPosition &&
          validMoves.some(dir => dir.x === previousDirection.x && dir.y === previousDirection.y);

        const adjustedProbability = isReturning ? totalProbability / 2 : totalProbability;

        if (!ghost.currentDirection || !isValidMove(ghost.position, ghost.currentDirection) || Math.random() < adjustedProbability) {
          changeDirection = true;
        }

        if (changeDirection) {
          const newValidMoves = isReturning
            ? validMoves.filter(dir => dir.x !== previousDirection.x || dir.y !== previousDirection.y)
            : validMoves;

          if (newValidMoves.length > 0) {
            ghost.currentDirection = newValidMoves[Math.floor(Math.random() * newValidMoves.length)];
          } else {
            ghost.currentDirection = validMoves[Math.floor(Math.random() * validMoves.length)];
          }
        }
      }

      if (ghost.currentDirection) {
        ghost.previousPosition = { ...ghost.position };
        ghost.position = { 
          x: ghost.position.x + ghost.currentDirection.x,
          y: ghost.position.y + ghost.currentDirection.y
        };
        
      }
    });
    ghosts = ghosts;

    checkCollision();
  }


  function checkWinCondition() {
    if (playerPosition.x === targetPosition.x && playerPosition.y === targetPosition.y) {
      clearInterval(ghostInterval); // Stop ghosts when level is complete
      if (currentLevel < mazes.length) {
        showMessage = true;
        setTimeout(() => {
          startLevel(currentLevel + 1);
          showMessage = false;
        }, 1000);
      } else {
        showCongratulations = true;
        maze = null;
      }
    }
  }


  function checkCollision() {
    ghosts.forEach(ghost => {
      if (playerPosition.x === ghost.position.x && playerPosition.y === ghost.position.y) {
        alert('You were caught by a ghost! Game over.');
        window.location.reload(); // Restart the game
      }
    });
  }

  onMount(() => {
    startLevel(currentLevel);
  });

</script>

{#if maze}
  <h2>Level {currentLevel} of {mazes.length}</h2>
  <div class="level" on:click={handleClick} on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} on:touchend={handleTouchEnd}>
    {#each maze as row, y}
      {#each row as cell, x}
        <div class="cell {cell === 1 ? 'wall' : ''}" style="grid-row: {y + 1}; grid-column: {x + 1};"></div>
      {/each}
    {/each}
    <Player {playerPosition} on:move={handleMove} />
    {#each ghosts as ghost}
      <Ghost position={ghost.position} />
    {/each}
    <div class="target" style="grid-row: {targetPosition.y + 1}; grid-column: {targetPosition.x + 1};"></div>
  </div>
{/if}

{#if showMessage}
  <div class="message">Level Complete! Moving to the next level...</div>
{/if}

{#if showCongratulations}
  <div class="message">Congratulations! You completed all levels!</div>
{/if}

<button class="cool-button" on:click={resetGame}>Reset Game</button>


<style>
.level {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  width: 400px;
  height: 400px;
  border: 2px solid black;
  position: relative;
}

.cell {
  width: 100%;
  height: 100%;
  box-sizing: border-box; /* Ensures padding and borders don't affect size */
}

.wall {
  background-color: black;
}

.target {
  width: 100%;
  height: 100%;
  background-color: yellow;
}

.message {
  margin-top: 10px;
  font-weight: bold;
  color: green;
}


.cool-button {
  margin-top: 30px;
  background-color: #f05972;
  color: #ffffff;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cool-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.cool-button:active {
  transform: translateY(2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  background-color: #f0b300;
}
</style>