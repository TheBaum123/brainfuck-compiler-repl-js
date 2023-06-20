#!/usr/bin/env node

const compiler = require("./bf-compiler.js")
const fs = require("fs")
const repl = require("./bf-repl.js")
const { resolve } = require("path")

if(process.argv.length == 3) {
    let code = fs.readFileSync(resolve(process.cwd(), process.argv[2]), "utf-8")
    code = code.replace("\n", "")
    compiler(code)
}

if(process.argv.length == 2) {
    repl()
}