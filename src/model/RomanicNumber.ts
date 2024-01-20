import { WrittenNumber } from "./WrittenNumber";

export class RomanicNumber extends WrittenNumber {
    public Order: Number = 0;

    constructor(text: string, value: number, explanation: string, order: number) {
        super(text, value, explanation);
        this.Order = order;
    }
}