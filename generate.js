// const data = 0

// transpile begin

const BOARD_SIDE_LENGTH = 9
const BOARD_LENGTH = 81
const BOARD_SUBLENGTH = 3

const blockAnchor = [0, 3, 6, 27, 30, 33, 54, 57, 60]
const blockOffset = [0, 1, 2, 9, 10, 11, 18, 19, 20]

function zeroBoard(board, length) {
    board = Array(length).fill(0)
}

function duplicateBoard(source, destination, length) {
    destination = [...source]
}

let checkerCountRunning = 0
function manageCheckerCallCount(add, reset) {
    checkerCountRunning -= reset * count;
    checkerCountRunning += add;
    return count 
}


function countCheckerCalls(board) {
    const tBoard = Array(BOARD_LENGTH)
    duplicateBoard(board, tBoard, BOARD_LENGTH);

    manageCheckerCallCount(0, 1);
    solveSudoku(tBoard);
    return manageCheckerCallCount(0, 0);
}

const randLarge = () => Math.random() * MAX_SAFE_INTEGER
const rand32 = randLarge // legacy naming

// void swap(board_t *a, board_t *b) {
//     board_t t = *a;
//     *a = *b;
//     *b = t;
// }

// void randomNumList(board_t* array, int size) {
//     for (board_t i = 0; i < size; i++) { array[i] = i; }
//     for (int i = size - 1; i; i--) {
//         int target = (int)rand32() % (i + 1); // assumes that int is 32 bits
//         swap(&array[i], &array[target]);
//     }
    
// }

// critical function, is bottleneck
function canPlace(board, position, number) {
    manageCheckerCallCount(1, 0)

    row = Math.floor(position / BOARD_SIDE_LENGTH);
    column = position % BOARD_SIDE_LENGTH;
    block = Math.floow(column / BOARD_SUBLENGTH) + row - row % BOARD_SUBLENGTH;

    for (i = 0; i < BOARD_SIDE_LENGTH; i++) {
        if(board[row * BOARD_SIDE_LENGTH + i] == number 
        || board[column + BOARD_SIDE_LENGTH * i] == number 
        || board[blockAnchor[block] + blockOffset[i]] == number) return 0;
    }

    return 1;
}

// int recursor(board_t* board, int position) {
//     if(position == BOARD_LENGTH) return 1;
//     if(board[position]) return recursor(board, position + 1);
//     for (board_t i = 1; i <= BOARD_SIDE_LENGTH; i++) {

//         if(!canPlace(board, position, i)) continue;

//         board[position] = i;
//         if(recursor(board, position + 1)) return 1;

//         board[position] = 0;
//     }
//     return 0;
// }

function solveSudoku(board) {
    recursor(board, 0);
}

// int recursorR(board_t* board, int position) {
//     if(position == BOARD_LENGTH) return 1;
//     if(board[position]) return recursorR(board, position + 1);

//     board_t guessOrder[BOARD_SIDE_LENGTH];
//     randomNumList(guessOrder, BOARD_SIDE_LENGTH);

//     for (int i = 0; i < BOARD_SIDE_LENGTH; i++) {

//         board_t guess = guessOrder[i] + 1;

//         if(!canPlace(board, position, guess)) continue;

//         board[position] = guess;
//         if(recursorR(board, position + 1)) return 1;

//         board[position] = 0;
//     }
//     return 0;
// }

function randomSolveSudoku(board) {
    recursorR(board, 0);
}

// int recursorU(board_t* board, int position, int count) {
//     if(position == BOARD_LENGTH) return count + 1;
//     if(board[position]) return recursorU(board, position + 1, count);

//     for (board_t i = 1; i <= BOARD_SIDE_LENGTH && count < 2; i++) {

//         if(!canPlace(board, position, i)) continue;

//         board[position] = i;
//         count = recursorU(board, position + 1, count);
//     }
//     board[position] = 0;
//     return count;
// }

function uniqueSolution(board) {
    const workingBoard = Array(BOARD_LENGTH);
    duplicateBoard(board, workingBoard, BOARD_LENGTH);
    return recursorU(workingBoard, 0, 0);
}

function generateFilledBoard(board) {
    zeroBoard(board, BOARD_LENGTH)
    randomSolveSudoku(board)
}

const _01 = Math.random // legacy naming

function generateBoard(minimumBoard, filledBoard, cellsToRemove) {
    zeroBoard(filledBoard, BOARD_LENGTH);
    generateFilledBoard(filledBoard);

    duplicateBoard(filledBoard, minimumBoard, BOARD_LENGTH);
    const removeOrder = Array(BOARD_LENGTH);
    randomNumList(removeOrder, BOARD_LENGTH);
    let removedCells = 0;

    for (let i = 0; i < BOARD_LENGTH; i++) {
        if(removedCells >= cellsToRemove) return;
        temp = minimumBoard[removeOrder[i]];
        minimumBoard[removeOrder[i]] = 0;
        if(uniqueSolution(minimumBoard) == 1) {
            removedCells++;
            continue;
        }
        minimumBoard[removeOrder[i]] = temp;
    }
}

function main(puzzleCount) {
    feed = ''

    board = Array(BOARD_LENGTH)
    solvedBoard = Array(BOARD_LENGTH)

    for (let i = 0; i < puzzleCount; i++) {

        let removes = _01() * 46 + 18; // set this
        generateBoard(board, solvedBoard, removes)
        
        feed += board.join() + '~'
        feed += solvedBoard.join() + '~'
        feed += removes + '~'
        feed += countCheckerCalls(board) + '~'

    }

    feed += "0~0~"
    return 0;
}


function generate(puzzleCount) {

}
