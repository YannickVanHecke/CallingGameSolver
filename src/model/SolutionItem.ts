export class SolutionItem { 
    public Order: number = 0;
    public Solution: number = 0;
    public Explanation: string = "";

    /**
     *
     */
    constructor(order: number, solution: number, explanation: string) {
        this.Order = order;
        this.Solution = solution;
        this.Explanation = explanation;
    }
}