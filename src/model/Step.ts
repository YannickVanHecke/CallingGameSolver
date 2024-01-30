import { FoundWrittenNumber } from "./FoundWrittenNumber";

export class Step {
    public Name: string;
    public Items: Array<FoundWrittenNumber>;

    constructor(name: string) {
        this.Name = name;
        this.Items = new Array<FoundWrittenNumber>();
    }
}