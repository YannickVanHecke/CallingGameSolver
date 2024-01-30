import { WrittenNumber } from "./WrittenNumber";

export class RomanicNumber extends WrittenNumber {
    public Order: number;

    constructor(order: number, sign: string, value: number, explanation: string) {
        super(sign, value, explanation);
        this.Order = order;
    }
}