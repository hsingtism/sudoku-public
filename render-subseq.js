// yes, there are better ways to do this, no i'm not gonna do them. thanks emmet!
const boardTemplate = '<div class="board"><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div></div>'.split('~')
const solutionBoardTemplate = '<div class="solutionBoard"><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div></div>'.split('~')

const blockAnchor = [0, 3, 6, 27, 30, 33, 54, 57, 60]
const blockOffset = [0, 1, 2, 9, 10, 11, 18, 19, 20]
const fillOrder = Array(81).fill().map((v, i) => blockAnchor[Math.floor(i / 9)] + blockOffset[i % 9])

render()
// let data = ""

// the PRNG in the JS version cannot be seeded
function invokeGenerator(puzzleCount) {

}

function render() {
    const dataArray = data.split('~').slice(0, -3)
    const puzzleCount = dataArray.length / 4

    const boards = Array(puzzleCount).fill().map((v, i) => dataArray[i * 4 + 0])
    const solutions = Array(puzzleCount).fill().map((v, i) => dataArray[i * 4 + 1])
    const removes = Array(puzzleCount).fill().map((v, i) => dataArray[i * 4 + 2])
    const checkercalls = Array(puzzleCount).fill().map((v, i) => dataArray[i * 4 + 3])

    let boardFeed = ''
    let solutionFeed = ''


    for(let i = 0; i < puzzleCount; i++) {
        const puzzleID = i + 1
    
        boardFeed += `<p>${puzzleID}. ${removes[i]} removed. ${checkercalls[i]} checker calls.</p>`
    
        for(let j = 0; j < 81; j++) {
            boardFeed += boardTemplate[j]
            boardFeed += boards[i][fillOrder[j]] != 0 ? boards[i][fillOrder[j]] : ' '
        }
    
        boardFeed += boardTemplate[81]
    
        solutionFeed += `<p>${puzzleID}. solution`
        solutionFeed += `<div class="solutionHolder">`
        
        for(let j = 0; j < 81; j++) {
            solutionFeed += boardTemplate[j]
            solutionFeed += solutions[i][fillOrder[j]]
        }
    
        solutionFeed += boardTemplate[81]
    

        solutionFeed += '</div>'
    }

    
    document.getElementById('boards').innerHTML = boardFeed
    document.getElementById('solutions').innerHTML = solutionFeed
    
}

