import { WrittenNumber } from "./WrittenNumber";

export class FoundWrittenNumber extends WrittenNumber {
    public IndexOfOccurrence: number;
    
    constructor(indexOfOccurrence: number, writtenNumber: WrittenNumber, value: string) {
        super(writtenNumber.Text, writtenNumber.Value, writtenNumber.Explanation);
        this.IndexOfOccurrence = indexOfOccurrence;
    }
}