import { convert } from "../src/convert"
import { suite, test } from "mocha-typescript"
import { expect } from "chai";

suite("parse object", () => {
    test("parse simple object", () => {
        const Id = d => d
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
});