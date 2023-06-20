module.exports = function(code) {
    const prompt = require("prompt-sync")()

    let memBand = []
    let memIndex = 0
    let transpiledCode = []
    let indent = 0

    code = code.split("")

    for(let i = 0; i < 3000; i++) {
        memBand.push(0)
    }

    code.forEach(element => {
        let line = []
        for(let i = 0; i < indent; i++) {
            line.push("    ")
        }
        switch(element) {
            case ">":
                line.push("memIndex++")
                break
            case "<":
                line.push("memIndex--")
                break
            case "+":
                line.push("memBand[memIndex]++")
                break
            case "-":
                line.push("memBand[memIndex]--")
                break
            case "[":
                line.push("while(memBand[memIndex] != 0) {")
                indent++
                break
            case "]":
                line[line.length - 1] = ""
                line.push("}")
                indent--
                break
            case ".":
                line.push("process.stdout.write(String.fromCharCode(memBand[memIndex]))")
                break
            case ",":
                line.push("memBand[memIndex] = prompt(\"input>\").charCodeAt(0)")
                break
            default:
                break
        }
        line = line.join("")
        transpiledCode.push(line)
    });

    transpiledCode = (transpiledCode.join("\n"))

    if(indent != 0) {
        console.log("Error: loop not closed!")
        process.exit(1)
    }

    eval(transpiledCode)

    console.log("")
}