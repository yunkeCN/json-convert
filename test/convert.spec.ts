import { convert } from "../src/convert"
import { suite, test } from "mocha-typescript"
import { expect } from "chai";
import { mock1 } from "./mock"

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
            },
            name: "xj"
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
    test("支持默认parser", () => {
        const scheme = {
            retCode: Number,
            isPass: Boolean,
        }
        const data = {
            retCode: "0",
            isPass: "false",
            name: "xj"
        }
        const schemeData = convert(scheme, data, { defaultParser: true })
        expect(schemeData).to.deep.equal({
            retCode: 0,
            isPass: true,
            name: "xj"
        })
    });
});

suite("转换数组", () => {
    test("转换简单的一层数组", () => {
        const scheme = [Number]
        const data = ["1", 2, true]
        const schemeData = convert(scheme, data)
        expect(schemeData).to.deep.equal([1, 2, 1])
    });
});

suite("对象与数组嵌套", () => {
    test("应该转换的数组", () => {
        const scheme = {
            array: [Number]
        }
        const data = {
            array: ["1", 2, true]
        }
        const schemeData = convert(scheme, data)
        expect(schemeData).to.deep.equal({
            array: [1, 2, 1]
        })
    });
    test("不应该转换的数组", () => {
        const scheme = {
            array: d => d
        }
        const data = {
            array: ["1", 2, true]
        }
        const schemeData = convert(scheme, data)
        expect(schemeData).to.deep.equal({
            array: ["1", 2, true]
        })
    })
})


suite("移动销售项目中的真实使用情况", () => {
    test("转换不存在的键", () => {
        function Item(item) {   
            console.log(item)
            return item
        }
        const scheme = {
            a: {
                b: {
                    c: String
                }
            },
        }
        const schemeData = convert(scheme, {})
        expect(schemeData).to.deep.equal({
            a: {
                b: {
                    c: "undefined"
                }
            }
        })
    });
})