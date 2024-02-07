import { SplittedNumber } from "../model/SplittedNumber";

describe("SplittedNumberTest", () => {
    it("een geeft 1", () => {
        var een = new SplittedNumber("een");
        expect(een.result).toBe(1);
    });
});