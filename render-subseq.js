render()
// let data = ""

// the PRNG in the JS version cannot be seeded
function invokeGenerator(puzzleCount) {

}

function render() {
    const dataArray = data.split('~')
    
    dataArray.pop()
    const PRNGstate1 = dataArray.pop()
    const PRNGstate0 = dataArray.pop()
    
    const boards = []
    const solutions = []
    const removes = []
    const checkercalls = []
    
    for(let i = 0; i < dataArray.length; i += 4) {
        boards.push(dataArray[i])
        solutions.push(dataArray[i + 1])
        removes.push(dataArray[i + 2])
        checkercalls.push(dataArray[i + 3])
    }
    
    let boardFeed = ''
    let solutionFeed = ''

    // yes, there are better ways to do this, no i'm not gonna do them. thanks emmet!
    const boardTemplate = '<div class="board"><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div></div>'.split('~')
    const solutionBoardTemplate = '<div class="solutionBoard"><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div><div class="boardrow"><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div><div class="boardblock"><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div><div class="blockrow"><div class="blockentry">~</div><div class="blockentry">~</div><div class="blockentry">~</div></div></div></div></div>'.split('~')
    
    const blockAnchor = [0, 3, 6, 27, 30, 33, 54, 57, 60]
    const blockOffset = [0, 1, 2, 9, 10, 11, 18, 19, 20]
    const fillOrder = []
    
    for(let i = 0; i < 81; i++) {
        fillOrder[i] = blockAnchor[Math.floor(i / 9)] + blockOffset[i % 9]
    }
    
    for(let i = 0; i < boards.length; i++) {
        const puzzleID = i
    
        boardFeed += `<p>${puzzleID}. ${removes[i]} removed. ${checkercalls[i]} checker calls.</p>`
    
        for(let j = 0; j < 81; j++) {
            boardFeed += boardTemplate[j]
            boardFeed += boards[i][fillOrder[j]] != 0 ? boards[i][fillOrder[j]] : ' '
        }
    
        boardFeed += boardTemplate[81]
    
        solutionFeed += `<div class="solutionHolder">`
        
    
        for(let j = 0; j < 81; j++) {
            solutionFeed += solutionBoardTemplate[j]
            solutionFeed += solutions[i][fillOrder[j]]
        }
    
        solutionFeed += solutionBoardTemplate[81]
    

        solutionFeed += '</div>'
    }

    
    document.getElementById('boards').innerHTML = boardFeed
    document.getElementById('solutions').innerHTML = solutionFeed
    
}

