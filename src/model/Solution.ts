import { SolutionItem } from "./SolutionItem";

export class Solution {
    public Items: Array<SolutionItem>;

    constructor() {
        this.Items = new Array<SolutionItem>();
    }
}