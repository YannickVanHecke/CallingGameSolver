import { WrittenNumber } from "./WrittenNumber";

export class RomanicNumber extends WrittenNumber {
    public Order: Number = 0;

    constructor(order: number, text: string, value: number, explanation: string) {
        super(text, value, explanation);
        this.Order = order;
    }
}