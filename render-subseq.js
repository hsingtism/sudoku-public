// yes, there are better ways to do this, no i'm not gonna do them. thanks emmet!
const boardTemplate = '<div class="board"><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div></div>'.split('~')

const blockAnchor = [0, 3, 6, 27, 30, 33, 54, 57, 60]
const blockOffset = [0, 1, 2, 9, 10, 11, 18, 19, 20]
const fillOrder = i => blockAnchor[Math.floor(i / 9)] + blockOffset[i % 9]

render()
// let data = ""

function invokeGenerator(puzzleCount) {

}

function render() {
    const dataArray = data.split('~').slice(0, -3)
    const puzzleCount = dataArray.length / 4

    const boards = i => dataArray[i * 4 + 0]
    const solutions = i => dataArray[i * 4 + 1]
    const removes = i => dataArray[i * 4 + 2]
    const checkercalls = i => dataArray[i * 4 + 3]

    const boardFeedPuzzle = (v, i) => `<p>${i + 1}. ${removes(i)} removed. ${checkercalls(i)} checker calls.</p>` 
        + Array(81).fill().flatMap((v, j) => [boardTemplate[j], boards(i)[fillOrder(j)].replace('0', ' ')]).join("") 
        + boardTemplate[81]

    const solutionFeedPuzzle = (v, i) => `<p>${i + 1}. solution</p>` 
        + Array(81).fill().flatMap((v, j) => [boardTemplate[j], solutions(i)[fillOrder(j)]]).join("") 
        + boardTemplate[81]

    document.getElementById('boards').innerHTML = Array(puzzleCount).fill().map(boardFeedPuzzle).join('')
    document.getElementById('solutions').innerHTML = Array(puzzleCount).fill().map(solutionFeedPuzzle).join('')
    
}

