#include <emscripten.h>

#include <stdio.h>
#include <stdint.h>
#include <stdlib.h> 
#include <string.h>

#define BOARD_SIDE_LENGTH 9
#define BOARD_LENGTH 81
#define BOARD_SUBLENGTH 3

typedef uint8_t board_t;

const int blockAnchor[] = {0, 3, 6, 27, 30, 33, 54, 57, 60};
const int blockOffset[] = {0, 1, 2, 9, 10, 11, 18, 19, 20};

void zeroBoard(board_t* board, int length) {
    for (int i = 0; i < length; i++) { board[i] = 0x00; }
}

void duplicateBoard(board_t* source, board_t* destination, int length) {
    for (int i = 0; i < length; i++) { destination[i] = source[i]; }
}

int manageCheckerCallCount(int add, int reset) {
    static int count = 0;
    count -= reset * count;
    count += add;
    return count; 
}

void solveSudoku(board_t* board);

int countCheckerCalls(board_t* board) {
    board_t tBoard[BOARD_LENGTH];
    duplicateBoard(board, tBoard, BOARD_LENGTH);

    manageCheckerCallCount(0, 1);
    solveSudoku(tBoard);
    return manageCheckerCallCount(0, 0);
}

// PRNG based on V8 https://v8.dev/blog/math-random.
// prng state at global scope so I can access it fom main
uint64_t state0;
uint64_t state1;
uint64_t xorshift128plus() {
    uint64_t s1 = state0;
    uint64_t s0 = state1;
    state0 = s0;
    s1 ^= s1 << 23;
    s1 ^= s1 >> 17;
    s1 ^= s0;
    s1 ^= s0 >> 26;
    state1 = s1;
    return state0 + state1;
}

// anding them just in case
uint64_t rand64() { return xorshift128plus(); }
uint32_t rand32() { return (uint32_t)(xorshift128plus() & 0x0000FFFF); }
uint16_t rand16() { return (uint16_t)(xorshift128plus() & 0x000000FF); }

void swap(board_t *a, board_t *b) {
    board_t t = *a;
    *a = *b;
    *b = t;
}

void randomNumList(board_t* array, int size) {
    for (board_t i = 0; i < size; i++) { array[i] = i; }
    for (int i = size - 1; i; i--) {
        int target = (int)rand32() % (i + 1); // assumes that int is 32 bits
        swap(&array[i], &array[target]);
    }
    
}

// critical function, is bottleneck
int canPlace(board_t* board, int position, board_t number) {
    (void)manageCheckerCallCount(1, 0);

    int row = position / BOARD_SIDE_LENGTH;
    int column = position % BOARD_SIDE_LENGTH;
    int block = column / BOARD_SUBLENGTH + row - row % BOARD_SUBLENGTH;

    for (int i = 0; i < BOARD_SIDE_LENGTH; i++) {
        if(board[row * BOARD_SIDE_LENGTH + i] == number 
        || board[column + BOARD_SIDE_LENGTH * i] == number 
        || board[blockAnchor[block] + blockOffset[i]] == number) return 0;
    }

    return 1;
}

int recursor(board_t* board, int position) {
    if(position == BOARD_LENGTH) return 1;
    if(board[position]) return recursor(board, position + 1);
    for (board_t i = 1; i <= BOARD_SIDE_LENGTH; i++) {

        if(!canPlace(board, position, i)) continue;

        board[position] = i;
        if(recursor(board, position + 1)) return 1;

        board[position] = 0;
    }
    return 0;
}

void solveSudoku(board_t* board) {
    recursor(board, 0);
}

int recursorR(board_t* board, int position) {
    if(position == BOARD_LENGTH) return 1;
    if(board[position]) return recursorR(board, position + 1);

    board_t guessOrder[BOARD_SIDE_LENGTH];
    randomNumList(guessOrder, BOARD_SIDE_LENGTH);

    for (int i = 0; i < BOARD_SIDE_LENGTH; i++) {

        board_t guess = guessOrder[i] + 1;

        if(!canPlace(board, position, guess)) continue;

        board[position] = guess;
        if(recursorR(board, position + 1)) return 1;

        board[position] = 0;
    }
    return 0;
}

void randomSolveSudoku(board_t* board) {
    recursorR(board, 0);
}

int recursorU(board_t* board, int position, int count) {
    if(position == BOARD_LENGTH) return count + 1;
    if(board[position]) return recursorU(board, position + 1, count);

    for (board_t i = 1; i <= BOARD_SIDE_LENGTH && count < 2; i++) {

        if(!canPlace(board, position, i)) continue;

        board[position] = i;
        count = recursorU(board, position + 1, count);
    }
    board[position] = 0;
    return count;
}

int uniqueSolution(board_t* board) {
    board_t workingBoard[BOARD_LENGTH];
    duplicateBoard(board, workingBoard, BOARD_LENGTH);
    return recursorU(workingBoard, 0, 0);
}

void generateFilledBoard(board_t* board) {
    zeroBoard(board, BOARD_LENGTH);
    randomSolveSudoku(board);
}

// this is technically undefined behavior 
// but everyone uses IEEE 754
double _01() {
    uint64_t u64 = 0x3FF0000000000000 | (rand64() >> 12);
    return *(double *)&u64 - 1.0;
}

void generateBoard(board_t* minimumBoard, board_t* filledBoard, 
                   int cellsToRemove) {
    zeroBoard(filledBoard, BOARD_LENGTH);
    generateFilledBoard(filledBoard);

    duplicateBoard(filledBoard, minimumBoard, BOARD_LENGTH);
    board_t removeOrder[BOARD_LENGTH];
    randomNumList(removeOrder, BOARD_LENGTH);
    int removedCells = 0;

    for (int i = 0; i < BOARD_LENGTH; i++) {
        if(removedCells >= cellsToRemove) return;
        board_t temp = minimumBoard[removeOrder[i]];
        minimumBoard[removeOrder[i]] = 0;
        if(uniqueSolution(minimumBoard) == 1) {
            removedCells++;
            continue;
        }
        minimumBoard[removeOrder[i]] = temp;
    }
}

char* mainchild(int puzzleCount, int deltaRemoves, int minRemoves, uint64_t state0I, uint64_t state1I) {
    state0 = state0I;
    state1 = state1I;

    char* out = (char*) calloc(181 * (puzzleCount + 1), sizeof(char)); // to be freed by main
    
    board_t board[BOARD_LENGTH];
    board_t solvedBoard[BOARD_LENGTH];
    int removes;

    for (int i = 0; i < puzzleCount; i++) {
        
        removes = _01() * deltaRemoves + minRemoves;
        generateBoard(board, solvedBoard, removes);
        
        for (int i = 0; i < BOARD_LENGTH; i++) {
            sprintf(out + strlen(out), "%c", (char)board[i] + 0x30);
        }

        sprintf(out + strlen(out), "~");

        for (int i = 0; i < BOARD_LENGTH; i++) {
            sprintf(out + strlen(out), "%c", (char)solvedBoard[i] + 0x30);
        }

        sprintf(out + strlen(out), "~");

        sprintf(out + strlen(out), "%09d~", removes);
        sprintf(out + strlen(out), "%09d~", countCheckerCalls(board));

    }
    
    sprintf(out + strlen(out), "0~");
    sprintf(out + strlen(out), "0~");

    return out;
}
