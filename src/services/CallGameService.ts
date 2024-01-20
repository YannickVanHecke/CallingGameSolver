import { Injectable, inject } from "@angular/core";
import { WrittenNumber } from "../model/WrittenNumber";
import { Solution } from "../model/Solution";
import { SolutionItem } from "../model/SolutionItem";
import { Step } from "../model/Step";

@Injectable()
export class CallGameService {
    private stepIndex: number = 1;
    private WrittenNumbers: Array<WrittenNumber> = new Array<WrittenNumber>();
    private RomanicNumber: Array<WrittenNumber> = new Array<WrittenNumber>();

    constructor() {
        this.InitiateWrittenNumbers();
        this.InitiateRomanicNumbers();
    }

    public solve(assignment: string): Solution {
        this.stepIndex = 1;
        var solution = new Solution();

        solution = this.solveWrittenNumbers(assignment, solution);
        solution = this.solveNumericNumbers(assignment, solution);
        return solution;
    }

    private solveWrittenNumbers(assignment: string, solution: Solution): Solution {
        var stepWrittenNumbers = new Step("Tel alle getallen op die je ziet staan in de bewerking, zowel geschreven als in cijfers");

        console.clear();
        const assignmentWithoutSpacing = assignment.toLowerCase()
            .replaceAll(" ", "")
            .replaceAll("ë", "e");
        const assigmentWithoutSpacingLength = assignmentWithoutSpacing.length;
        var sortedWrittenNumbersByTextLength = this.WrittenNumbers.sort((a, b) => b.Length - a.Length);
        console.log(sortedWrittenNumbersByTextLength);
        var maxLengthWrittenNumbers = this.WrittenNumbers.sort((a, b) => a.Length - b.Length)[0];
        console.log("maxLengthWrittenNumbers: " + maxLengthWrittenNumbers);
        console.log("assignmentWithoutSpacing: " + assignmentWithoutSpacing);

        this.WrittenNumbers.forEach(wn => {
            if (assignmentWithoutSpacing.indexOf(wn.Text) !== -1) {
                stepWrittenNumbers.Items.push(new SolutionItem(this.stepIndex, wn.Value, wn.Explanation));
                this.stepIndex++;
            }
        });
        solution.Steps.push(stepWrittenNumbers);



        return solution;
    
    }

    private solveNumericNumbers(assignment: string, solution: Solution): Solution {
        var step = new Step("Tel alle getallen die je ziet staan in de bewerking, zowel in cijfers als in tekst");

        var words = assignment.split(" ");

        words.forEach(word => {
            if (parseInt(word)) {
                var number = parseInt(word);
                step.Items.push(new SolutionItem(this.stepIndex, number, word + " -> " + number));
                this.stepIndex++;
            }
        });

        solution.Steps.push(step);

        return solution;
    }

    private InitiateWrittenNumbers() {
        this.WrittenNumbers.push(new WrittenNumber("nul", 0, "nul -> 0"));
        this.WrittenNumbers.push(new WrittenNumber("een", 1, "een -> 1"));
        this.WrittenNumbers.push(new WrittenNumber("twee", 2, "twee -> 2"));
        this.WrittenNumbers.push(new WrittenNumber("drie", 3, "drie -> 3"));
        this.WrittenNumbers.push(new WrittenNumber("vier", 4, "vier -> 4"));
        this.WrittenNumbers.push(new WrittenNumber("vijf", 5, "vijf -> 5"));
        this.WrittenNumbers.push(new WrittenNumber("zes", 6, "zes -> 6"));
        this.WrittenNumbers.push(new WrittenNumber("zeven", 7, "zeven -> 7"));
        this.WrittenNumbers.push(new WrittenNumber("acht", 8, "acht -> 8"));
        this.WrittenNumbers.push(new WrittenNumber("negen", 9, "negen -> 9"));
        this.WrittenNumbers.push(new WrittenNumber("tien", 10, "tien -> 10"));

        this.WrittenNumbers.push(new WrittenNumber("elf", 11, "elf -> 11"));
        this.WrittenNumbers.push(new WrittenNumber("twaalf", 12, "twaalf -> 12"));
        this.WrittenNumbers.push(new WrittenNumber("dertien", 13, "dertien -> 13"));
        this.WrittenNumbers.push(new WrittenNumber("veertien", 14, "veertien -> 14"))

        this.WrittenNumbers.push(new WrittenNumber("twintig", 20, "twintig -> 20"));
        this.WrittenNumbers.push(new WrittenNumber("dertig", 30, "dertig -> 30"));
        this.WrittenNumbers.push(new WrittenNumber("veertig", 40, "veertig -> 40"));
        this.WrittenNumbers.push(new WrittenNumber("tachtig", 80, "tachtig -> 80"));

        this.WrittenNumbers.push(new WrittenNumber("honderd", 100, "honderd -> 100"));
        this.WrittenNumbers.push(new WrittenNumber("duizend", 1000, "duizend -> 1000"));
        this.WrittenNumbers.push(new WrittenNumber("miljoen", 1000000, "miljoen -> 1.000.000"));
        this.WrittenNumbers.push(new WrittenNumber("mijard", 1000000000, "miljard -> 1.000.000.000"));
    }

    private InitiateRomanicNumbers() {
        this.RomanicNumber.push(new WrittenNumber("I", 1, "I -> 1"));
        this.RomanicNumber.push(new WrittenNumber("V", 5, "V -> 5"));
        this.RomanicNumber.push(new WrittenNumber("X",  10, "X -> 10"));
        this.RomanicNumber.push(new WrittenNumber("L", 50, "L -> 50"));
        this.RomanicNumber.push(new WrittenNumber("C", 100, "C -> 100"));
        this.RomanicNumber.push(new WrittenNumber("D", 500, "D -> 500"));
        this.RomanicNumber.push(new WrittenNumber("M", 1000, "M -> 1000"));
    }
}