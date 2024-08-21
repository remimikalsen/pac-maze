<script>
  import Player from './Player.svelte';
  import Ghost from './Ghost.svelte';
  import Icon from '@iconify/svelte';
  import VirtualKeyboard from './VirtualKeyboard.svelte';
  import houseWithGarden from '@iconify-icons/twemoji/house-with-garden';
  import Message from './Message.svelte';
  import { onMount } from 'svelte';



  let showNextLevelMessage = false;
  let nextLevelButton;
  let showCongratulations = false;
  let showErrorMessage = false;
  let showGameOverMessage = false;
  let currentMessage = '';
  let currentLevel = 1;
  let leaderboard = [];
  let startTime; // Start time of the level
  let levelTime = 0; // Time spent on the current level
  let totalTime = 0; // Total time spent on all levels  

  let showKeyboard = false;
  let playerInitials = '';

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
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
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
    totalTime = 0;
    showNextLevelMessage = false;
    showCongratulations = false;
    showErrorMessage = false;
    showGameOverMessage = false;    
    clearInterval(ghostInterval);
    startLevel(1);
  }

  async function handleSubmitInitials(initials) {
    playerInitials = initials;
    await storeScore(playerInitials, totalTime);  // Wait for the score to be stored
    await loadLeaderboard();  // Load the updated leaderboard after the score is stored
    showKeyboard = false;
    showCongratulations = false;
  }

  function startLevel(level) {

    if (level < 1 || level > mazes.length) {      
      showErrorMessage = true;
      currentMessage = 'Invalid level number';
      return;
    }

    maze = mazes[level - 1];
    let gridSize = maze.length;

    // Check if all elements of maze are of equal length as gridSize
    for (let i = 0; i < maze.length; i++) {
      if (maze[i].length !== gridSize) {
        showErrorMessage = true;
        currentMessage = `Invalid maze dimensions in maze ${currentLevel}, line ${i + 1}`;
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
    startTime = new Date();
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

  function startNextLevel() {
    showNextLevelMessage = false;
    startLevel(currentLevel + 1);
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

      levelTime = Math.floor((new Date() - startTime) / 1000); // Calculate level time in seconds
      totalTime += levelTime; // Add level time to total time

      clearInterval(ghostInterval); // Stop ghosts when level is complete
      if (currentLevel < mazes.length) {
        showNextLevelMessage = true;
        currentMessage = 'Level cleared! Ready for the next one?';
      } else {
        showCongratulations = true;
        showKeyboard = true; // Show the keyboard for entering initials
        currentMessage = 'Want to go for the hall of fame?';
        maze = null;
      }
    }
  }

  function checkCollision() {
    ghosts.forEach(ghost => {
      if (playerPosition.x === ghost.position.x && playerPosition.y === ghost.position.y) {
        showGameOverMessage = true;
        currentMessage = 'You were caught by a ghost! Game over.';
      }
    });
  }


  async function storeScore(initials, time) {
    await fetch('http://localhost:3000/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ initials, time })
    });
  }

  async function fetchLeaderboard() {
    const response = await fetch('http://localhost:3000/leaderboard');
    return await response.json();
  }

  async function loadLeaderboard() {
    const data = await fetchLeaderboard();
    leaderboard = [...data];
  }  

  onMount(() => {
    startLevel(currentLevel);
    loadLeaderboard();
  });


  $: if (showNextLevelMessage) {
    onMount(() => {
      if (nextLevelButton) {
        nextLevelButton.focus();
      }
    });
  }

</script>
<div class="container">
<div class="left-column">

  {#if maze && !showNextLevelMessage && !showErrorMessage && !showGameOverMessage && !showCongratulations}
    <h2 class="level-denomination">Level {currentLevel} of {mazes.length}</h2>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="level" on:click={handleClick} on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} on:touchend={handleTouchEnd} role="grid" tabindex="0" aria-label="Maze grid, use arrow keys to move">
      {#each maze as row, y}
        {#each row as cell, x}
          <div class="cell {cell === 1 ? 'wall' : ''}" style="grid-row: {y + 1}; grid-column: {x + 1};" role="gridcell" aria-label={cell === 1 ? 'Wall' : 'Empty cell'}></div>
        {/each}
      {/each}
      <Player {playerPosition} on:move={handleMove} />
      {#each ghosts as ghost}
        <Ghost position={ghost.position} />
      {/each}
      <div class="target" style="grid-row: {targetPosition.y + 1}; grid-column: {targetPosition.x + 1};">
        <Icon icon={houseWithGarden} width="20" height="20" />
      </div>
    </div>
  {/if}

  {#if showNextLevelMessage}
    <Message type="info" message={currentMessage} />
    <button class="next-level-button" on:click={startNextLevel} bind:this={nextLevelButton}>Start Next Level</button>
  {/if}

  {#if showCongratulations}
    <Message type="winner" message={currentMessage} />
  {/if}

  {#if showKeyboard}
    <VirtualKeyboard onSubmit={handleSubmitInitials} />
  {/if}

  {#if showErrorMessage}
    <Message type="error" message={currentMessage} />
  {/if}

  {#if showGameOverMessage}
    <Message type="gameover" message={currentMessage} />
  {/if}

  <button class="reset-button" on:click={resetGame}>Start over</button>

</div>
<div class="right-column">
  {#if leaderboard && leaderboard.length > 0}
  <div class="leaderboard">
    <h2>High scores!</h2>
    <table>
      <thead>
        <tr>
          <th class="rank">Rank</th>
          <th class="initials">Initials</th>
          <th class="time">Time</th>
        </tr>
      </thead>
      <tbody>
        {#each leaderboard as { initials, time }, i}
          <tr>
            <td class="rank">{i + 1}.</td>
            <td class="initials">{initials}</td>
            <td class="time">{time} s</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  {/if}

</div>
</div>

<style>
h2.level-denomination {
  color: #f05972;
  font-family: 'Courier New', Courier, monospace;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: 100%;
    padding: 20px;
}


.left-column,
.right-column {
  flex: 1; /* Make both columns take equal space */
  display: flex;
  flex-direction: column; /* Stack content vertically */
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  padding: 20px;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column; /* Stack the columns on smaller screens */
    padding: 10px;
  }

  .left-column,
  .right-column {
    width: 100%;
    padding: 10px 0;
  }
}

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
}

.next-level-button,
.reset-button {
  margin-top: 70px;
  margin-bottom: 50px;
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

.next-level-button {
  background-color: #0b5d0b; 
  margin-top: 60px;
  margin-bottom: 0px;
}

.next-level-button:hover,
.reset-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.next-level-button:active,
.reset-button:active {
  transform: translateY(2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  background-color: #f0b300;
}

.leaderboard {
  padding: 10px;
  background-color: #1b263b;
  color: #e0e1dd;
  border-radius: 5px;
  border-style: solid;
  border-color: #f05972;
  border-width: 2px;
  box-shadow: 0 0px 12px rgba(237, 74, 213, 0.6);
  min-width: 250px;
  margin: 20px auto;
}

.leaderboard h2 {
  color: #f05972;
  font-family: 'Courier New', Courier, monospace;
}

.leaderboard table {
  width: 100%;
  border-collapse: collapse;  
}

.leaderboard th, .leaderboard td {
  padding: 5px;
  text-align: left;
}

.leaderboard th {
  border-bottom: 2px solid #e0e1dd;
  }

  /*
.leaderboard tr:nth-child(even) {
  background-color: #2e3b4e;
}

.leaderboard tr:hover {
  background-color: #34495e;
}
*/

.leaderboard tr:first-child td {
  color: #ffd700; /* Golden color */
  text-shadow: 
    0 0 5px #ffd700,  /* Inner glow */
    0 0 10px #ffd700, /* Slightly outer glow */
    0 0 20px #ffd700, /* Further outer glow */
    0 0 40px #ff8c00, /* More outer glow in a different shade */
    0 0 60px #ff8c00, /* Outer glow with more spread */
    0 0 80px #ff8c00; /* Stronger outer glow */
  font-weight: bold;
}


.leaderboard tr:nth-child(2) td {
  color: #c0c0c0; /* Silver color */
  text-shadow: 
    0 0 5px #c0c0c0,  /* Inner glow */
    0 0 10px #c0c0c0, /* Slightly outer glow */
    0 0 20px #ffffff, /* Further outer glow with a lighter shade */
    0 0 40px #ffffff, /* More outer glow in white */
    0 0 60px #d9d9d9, /* Outer glow with more spread in a light silver */
    0 0 80px #d9d9d9; /* Stronger outer glow */
  font-weight: bold;
}


.leaderboard tr:nth-child(3) td {
  color: #cd7f32; /* Bronze color */
  text-shadow: 
    0 0 5px #cd7f32,  /* Inner glow */
    0 0 10px #cd7f32, /* Slightly outer glow */
    0 0 20px #b87333, /* Further outer glow with a darker bronze shade */
    0 0 40px #b87333, /* More outer glow */
    0 0 60px #a0522d, /* Outer glow with more spread in a deeper bronze */
    0 0 80px #a0522d; /* Stronger outer glow */
  font-weight: bold;
}

.leaderboard .rank {
  width: 30%;
  text-align: center;
}
.leaderboard .initials {
  width: 40%;
  text-align: center;
}

.leaderboard td.initials {
  text-transform: uppercase;
}

.leaderboard .time {
  width: 30%;
  text-align: center;
}


</style>