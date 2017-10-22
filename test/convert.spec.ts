import { convert, Ischeme } from "../src/convert"
const Id = d => d
const scheme: Ischeme = {
    retCode: Number,
    isPass: Boolean,
    "*": Id
}

const data = {
    retCode: "0",
    isPass: "false",
    other: {
        time: Date.now()
    }
}
const schemeData = convert(scheme, data)
console.log(schemeData)
console.log(scheme)