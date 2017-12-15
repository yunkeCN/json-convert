import { maybe, pure } from "../src/types"
import { suite, test } from "mocha-typescript"
import { expect } from "chai";

suite("maybe", () => {
    const maybeNum = maybe(Number)
    test("有数据", () => {
        expect(maybeNum(1)).to.deep.equal(1)
    });
    test("无数据", () => {
        expect(maybeNum(undefined)).to.deep.equal(undefined)
        expect(maybeNum(null)).to.deep.equal(null)
    });
});

suite("pure", () => {
    const pureNum = pure(Number)
    test("有数据", () => {
        expect(pureNum(1)).to.deep.equal(1)
    });
    test("无数据", () => {
        expect(pureNum(undefined)).to.deep.equal(0)
        expect(pureNum(null)).to.deep.equal(0)
    });
});
