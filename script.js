const sudokuGrid = document.getElementById('sudoku-grid');
const checkSolutionButton = document.getElementById('check-solution');
const resetGameButton = document.getElementById('reset-game');
const resultDisplay = document.getElementById('result');

// Sample Sudoku puzzle (0 represents empty cells)
const sudokuPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Create the Sudoku grid
function createSudokuGrid() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.type = 'number';
            cell.className = 'cell';
            cell.maxLength = 1;
            cell.min = 1; // Limit input to 1
            cell.max = 9; // Limit input to 9
            cell.value = sudokuPuzzle[row][col] !== 0 ? sudokuPuzzle[row][col] : '';
            cell.readOnly = sudokuPuzzle[row][col] !== 0; // Make pre-filled cells read-only
            sudokuGrid.appendChild(cell);
        }
    }
}

// Check the solution
function checkSolution() {
    const userSolution = [];
    const cells = document.querySelectorAll('.cell');

    for (let i = 0; i < cells.length; i++) {
        const value = parseInt(cells[i].value);
        userSolution[Math.floor(i / 9)] = userSolution[Math.floor(i / 9)] || [];
        userSolution[Math.floor(i / 9)][i % 9] = isNaN(value) ? 0 : value;
    }

    // Clear previous highlights
    cells.forEach(cell => {
        cell.classList.remove('valid', 'invalid');
    });

    // Check the solution
    if (JSON.stringify(userSolution) === JSON.stringify(sudokuPuzzle)) {
        resultDisplay.textContent = 'Congratulations! You solved the Sudoku!';
        cells.forEach(cell => {
            if (!cell.readOnly) {
                cell.classList.add('valid');
            }
        });
    } else {
        resultDisplay.textContent = 'Incorrect solution. Please try again.';
        cells.forEach((cell, index) => {
            const correctValue = sudokuPuzzle[Math.floor(index / 9)][index % 9];
            if (cell.value != correctValue && !cell.readOnly) {
                cell.classList.add('invalid');
            }
        });
    }
}

// Reset the game
function resetGame() {
    // Clear the grid
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (!cell.readOnly) {
            cell.value = '';
            cell.classList.remove('valid', 'invalid');
        }
    });
    resultDisplay.textContent = '';
}

// Initialize the Sudoku grid
createSudokuGrid();

// Add event listener to the check solution button
checkSolutionButton.addEventListener('click', checkSolution);

// Add event listener to the reset game button
resetGameButton.addEventListener('click', resetGame);