import { WrittenNumber } from "./WrittenNumber";

export class FoundWrittenNumber extends WrittenNumber {
    public Index: number;

    constructor(index: number, writtenNumber: WrittenNumber) {
        super(writtenNumber.Text, writtenNumber.Value, writtenNumber.Explanation);
        this.Index = index;
    }
}