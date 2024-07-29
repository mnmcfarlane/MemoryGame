document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');
    let pattern = [];
    let userPattern = [];
    let buttons = [];
    let numButtons = 1;
    let currentRound = 0;

    function createButton(index) {
        const button = document.createElement('button');
        button.dataset.index = index;
        button.style.backgroundColor = '#ccc'; // Default color
        button.style.width = '100px';
        button.style.height = '100px';
        button.addEventListener('click', () => handleButtonClick(index));
        return button;
    }

    function addButtons(count) {
        board.innerHTML = ''; // Clear existing buttons
        buttons = [];
        for (let i = 0; i < count; i++) {
            const button = createButton(i);
            buttons.push(button);
            board.appendChild(button);
        }
        updateGridLayout();
    }

    function updateGridLayout() {
        board.style.gridTemplateColumns = `repeat(auto-fill, 100px)`;
    }

    function nextRound() {
        userPattern = [];
        pattern = Array.from({ length: buttons.length }, (_, i) => i);
        shuffleArray(pattern);
        currentRound++;
        flashPattern();
    }

    function flashPattern() {
        let index = 0;
        const interval = setInterval(() => {
            if (index < pattern.length) {
                const button = buttons[pattern[index]];
                button.style.backgroundColor = 'red';
                setTimeout(() => {
                    button.style.backgroundColor = '#ccc'; // Reset color
                }, 300);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 600);
    }

    function handleButtonClick(index) {
        if (index === pattern[userPattern.length]) {
            buttons[index].style.backgroundColor = 'green'; // Glow green
            userPattern.push(index);
            if (userPattern.length === pattern.length) {
                setTimeout(() => {
                    alert('Round Complete! Adding a new button.');
                    numButtons++;
                    addButtons(numButtons);
                    nextRound();
                }, 500); // Short delay before starting the next round
            }
        } else {
            alert('Game Over!');
            restartGame();
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function restartGame() {
        numButtons = 1;
        addButtons(numButtons);
        nextRound();
    }

    restartBtn.addEventListener('click', restartGame);
    addButtons(numButtons);
    nextRound();
});
