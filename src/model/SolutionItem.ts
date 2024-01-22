import { Explanation } from "./Explanation";

export class SolutionItem { 
    public Order: number = 0;
    public Solution: number = 0;
    public Explanation: Explanation;

    /**
     *
     */
    constructor(order: number, solution: number, explanation: Explanation) {
        this.Order = order;
        this.Solution = solution;
        this.Explanation = explanation;
    }
}