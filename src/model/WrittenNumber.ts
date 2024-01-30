export class WrittenNumber {
    public Text!: string;
    public Value!: number;
    public Explanation!: string;
    public Length!: number;

    constructor(text: string, value: number, explanation: string) {
        this.Text = text;
        this.Value = value;
        this.Explanation = explanation;
    }
}