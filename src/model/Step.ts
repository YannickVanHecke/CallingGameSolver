import { SolutionItem } from "./SolutionItem";

export class Step {
    public Name: string;
    public Items: Array<SolutionItem>;

    constructor(name: string) {
        this.Name = name;
        this.Items = new Array<SolutionItem>();
    }
}