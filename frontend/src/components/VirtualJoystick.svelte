<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let interval;

    function startKeyRepeat(key) {
        handleKey(key);
        interval = setInterval(() => {
            handleKey(key);
        }, 100);
    }

    function stopKeyRepeat() {
        clearInterval(interval);
    }

    function handleKey(key) {
        dispatch('key', { key });
    }

    function handleButtonEvents(node, key) {
        const start = () => startKeyRepeat(key);
        const stop = () => stopKeyRepeat();

        node.addEventListener('mousedown', start);
        node.addEventListener('mouseup', stop);
        node.addEventListener('mouseleave', stop);
        node.addEventListener('touchstart', start);
        node.addEventListener('touchend', stop);
        node.addEventListener('touchcancel', stop);

        return {
            destroy() {
                node.removeEventListener('mousedown', start);
                node.removeEventListener('mouseup', stop);
                node.removeEventListener('mouseleave', stop);
                node.removeEventListener('touchstart', start);
                node.removeEventListener('touchend', stop);
                node.removeEventListener('touchcancel', stop);
            }
        };
    }
</script>

<div class="virtual-joystick">
    <button use:handleButtonEvents={'ArrowUp'}>↑</button>
    <div>
        <button use:handleButtonEvents={'ArrowLeft'}>←</button>
        <button use:handleButtonEvents={'ArrowDown'}>↓</button>
        <button use:handleButtonEvents={'ArrowRight'}>→</button>
    </div>
</div>


<style>
    .virtual-joystick {
        display: none;
    }

    .virtual-joystick button {
        width: 60px;
        height: 60px;
        font-size: 24px;
        margin: 5px;
        border-radius: 10px;
        background-color: #f05972;
        color: white;
        border: none;
        cursor: pointer;
    }

    .virtual-joystick div {
        display: flex;
        justify-content: center;
    }

    .virtual-joystick button:active {
        background-color: #e04b5d;
    }

    @media (max-width: 600px) {
        .virtual-joystick {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
            }
    }

</style>
