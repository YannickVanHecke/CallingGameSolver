export class SolutionItem { 
    public Order: Number = 0;
    public Solution: Number = 0;
    public Explanation: string = "";

    /**
     *
     */
    constructor(order: Number, solution: Number, explanation: string) {
        this.Order = order;
        this.Solution = solution;
        this.Explanation = explanation;
    }
}