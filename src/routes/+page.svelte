<script>
  import PacMazes from '../components/PacMazes.svelte';
</script>
<header>
  <h1>PacMaze</h1>
  <p>Take on the maze!</p>
</header>
<main>
  <PacMazes  />
</main>
<footer>
    <p>
      Brought to you by the amazing <a href="https://theawesomegarage.com">TheAwesomeGarage.com</a>
    </p>
    <p>
      View the source code on <a href="https://github.com/remimikalsen/pacmaze">GitHub</a>
    </p>
</footer>
<style>
  /* General Styles */
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #0d1b2a;
    color: #e0e1dd;
    text-align: center;
  }

  header {
    background-color: #1b263b;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
  }

  header p {
    color: white;
  }

  h1 {
    font-size: 3rem;
    color: #e94560;
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
  }

  p {
    margin: 10px 0;
    font-size: 1.2rem;
  }

  a {
    color: #f0a500;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  footer {
    background-color: #1b263b;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.3);
  }

  footer p {
    color: white;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #e94560;
    color: #e0e1dd;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s, transform 0.2s;
  }

  button:hover {
    background-color: #f05972;
  }

  button:active {
    transform: scale(0.95);
  }

  footer p {
    margin: 5px 0;
  }
</style>