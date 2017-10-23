import { convert } from "../src/convert"
import { suite, test } from "mocha-typescript"
import { expect } from "chai";

suite("转换对象", () => {
    test("转换简单的一层对象", () => {
        const scheme = {
            retCode: Number,
            isPass: Boolean
        }
        const data = {
            retCode: "0",
            isPass: "false",
            other: {
                time: Date.now()
            }
        }
        const schemeData = convert(scheme, data)
        expect(schemeData).to.deep.equal({
            retCode: 0,
            isPass: true
        })
    });
    test("转换嵌套对象", () => {
        const Id = d => d
        const scheme = {
            retCode: Number,
            isPass: Boolean,
            other: {
                time: Id
            }
        }
        const now = Date.now()
        const data = {
            retCode: "0",
            isPass: "false",
            other: {
                time: now,
                x: "q"
            }
        }
        const schemeData = convert(scheme, data)
        expect(schemeData).to.deep.equal({
            retCode: 0,
            isPass: true,
            other: {
                time: now
            }
        })
    });
});