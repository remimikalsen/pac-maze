<!-- Message.svelte -->
<script>
    export let type = 'info'; // 'winner', 'info', 'error', 'gameover'
    export let message = '';
  </script>
  
  <div class="message {type}">
    {#if type === 'winner'}
      <p class="congrats">Congratulations!</p>
    {/if}
    <p>{message}</p>
  </div>
  
  <style>
    .message {
      padding: 20px;
      margin-top: 20px;
      border-radius: 8px;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }
  
    .message.info {
      color: #e0f7fa;
    }
  
    .message.error {
      background-color: #ffebee;
      color: #c62828;
    }
  
    .message.gameover {
      background-color: #f44336;
      color: #ffebee;
    }

    .message.winner p.congrats {
      color: #ffd700; /* Golden color */
      margin-bottom: 15px;
      font-size: 120%;
      text-shadow: 
        0 0 5px #ffd700,  /* Inner glow */
        0 0 10px #ffd700, /* Slightly outer glow */
        0 0 20px #ffd700, /* Further outer glow */
        0 0 40px #ff8c00, /* More outer glow in a different shade */
        0 0 60px #ff8c00, /* Outer glow with more spread */
        0 0 80px #ff8c00; /* Stronger outer glow */
    }
    
    .message p {
      margin: 0;
    }
  </style>
  