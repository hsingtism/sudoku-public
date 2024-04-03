document.getElementById('fire').addEventListener('click', () => {
    generateBoards(
        document.getElementById('pCount').value,
        document.getElementById('maxRemoves').value - document.getElementById('minRemoves').value,
        document.getElementById('minRemoves').value,
    )
})

document.getElementById('removeUI').addEventListener('click', () => {
    document.getElementById('interaction').innerHTML = ''
})

document.getElementById('removeAnswer').addEventListener('click', () => {
    document.getElementById('solutions').innerHTML = ''
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Module.onRuntimeInitialized = () => {
    document.getElementById('status').innerText = "WEBASSEMBLY READY. WAITING FOR USER INPUT"
}

async function generateBoards(puzzleCount, deltaRemoves, minRemoves) {
    document.getElementById('status').innerText = "GENERATING PUZZLES. WAIT PATIENTLY."
    document.getElementById('boards').innerHTML = ""
    document.getElementById('solutions').innerHTML = ""

    await sleep(0)

    data = Module.ccall(
        'mainchild', 
        'string', 
        ['number', 'number', 'number', 'number', 'number'], 
        [puzzleCount, deltaRemoves, minRemoves, Number.MAX_SAFE_INTEGER * Math.random(), Number.MAX_SAFE_INTEGER * Math.random() + 1])
    render(data)
    document.getElementById('status').innerText = "COMPLETE."
}

function render(data) {
    // yes, there are better ways to do this, no i'm not gonna do them. thanks emmet!
    const boardTemplate = JSON.parse('["<div class=\\"board\\"><div class=\\"boardrow\\"><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div></div><div class=\\"boardrow\\"><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div></div><div class=\\"boardrow\\"><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div><div class=\\"boardblock\\"><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div><div class=\\"blockrow\\"><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div><div class=\\"blockentry\\">","</div></div></div></div></div>"]')
    const blockAnchor = [0, 3, 6, 27, 30, 33, 54, 57, 60]
    const blockOffset = [0, 1, 2, 9, 10, 11, 18, 19, 20]
    const fillOrder = i => blockAnchor[Math.floor(i / 9)] + blockOffset[i % 9]
    
    const dataArray = data.split('~').slice(0, -3) // using "data" from other file
    const puzzleCount = dataArray.length / 4
    
    const boards = i => dataArray[i * 4 + 0]
    const solutions = i => dataArray[i * 4 + 1]
    const removes = i => +dataArray[i * 4 + 2]
    const checkercalls = i => +dataArray[i * 4 + 3]
    
    const boardFeedPuzzle = (v, i) => `<p>${i + 1}. ${removes(i)} removed. ${checkercalls(i)} checker calls.</p>` 
        + Array(81).fill().flatMap((v, j) => [boardTemplate[j], boards(i)[fillOrder(j)].replace('0', ' ')]).join("") 
        + boardTemplate[81]
    
    const solutionFeedPuzzle = (v, i) => `<p>${i + 1}. solution</p>` 
        + Array(81).fill().flatMap((v, j) => [boardTemplate[j], solutions(i)[fillOrder(j)]]).join("") 
        + boardTemplate[81]
    
    document.getElementById('boards').innerHTML = Array(puzzleCount).fill().map(boardFeedPuzzle).join('')
    document.getElementById('solutions').innerHTML = Array(puzzleCount).fill().map(solutionFeedPuzzle).join('')
}
