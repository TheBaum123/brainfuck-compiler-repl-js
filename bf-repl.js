const prompt = require("prompt-sync")()
let memBand = []
let memIndex = 0

module.exports = function() {
    const clear = require("clear")
    
    
    for(let i = 0; i < 3000; i++) {
        memBand.push(0)
    }

    while(true) {
        let code = prompt(">>> ")
        switch(code.toLowerCase()) {
            case "exit":
            case "quit":
                process.exit(0)
                break
            case "log":
                console.log(`your cursor is at index ${memIndex}. That cells value is ${memBand[memIndex]}`)
                break
            case "clear":
                clear()
                break
            case "reset":
                for(let i = 0; i < memBand.length; i++) {
                    memBand[i] = 0
                }
                memIndex = 0
            default:
                runCode(code)
                break
        }
    }
}


function runCode(code) {
    let transpiledCode = []
    let indent = 0
    code = code.split("")
    code.forEach(elem => {
        let currentLine = []
        for(let i = 0; i < indent; i++) {
            currentLine.push("    ")
        }
        switch(elem) {
            case ">":
                currentLine.push("memIndex++")
                break
            case "<":
                currentLine.push("memIndex--")
                break
            case "+":
                currentLine.push("memBand[memIndex]++")
                break
            case "-":
                currentLine.push("memBand[memIndex]--")
                break
            case ".":
                currentLine.push("process.stdout.write(String.fromCharCode(memBand[memIndex]))")
                break
            case ",":
                currentLine.push("memBand[memIndex] = prompt(\"input>\").charCodeAt(0)")
                break
            case "[":
                indent++
                currentLine.push("while(memBand[memIndex] > 0) {")
                break
            case "]":
                if(currentLine.length > 0) {
                    currentLine.shift()
                }
                indent--
                currentLine.push("}")
                break
        }
        transpiledCode.push(currentLine.join(""))
    })

    if(indent > 0) {
        console.log("You forgot closing some loop(s)!")
        return
    }

    if(indent < 0) {
        console.log("You closed to many loop(s)!")
        return
    }

    transpiledCode = transpiledCode.join("\n")
    eval(transpiledCode)
    console.log()
    if(memIndex < 0) {
        console.log("Moved the cursor into the negative! That doesn't work. The cursor was reset to cell 0.")
        memIndex = 0
    }
    if(memIndex >= 3000) {
        console.log("Moved the cursor out of range! That doesn't work. The cursor was reset to cell 0.")
        memIndex = 0
    }
}
