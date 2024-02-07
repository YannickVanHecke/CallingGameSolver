import { Injectable } from "@angular/core";
import { WrittenNumber } from "../model/WrittenNumber";
import { Solution } from "../model/Solution";
import { Step } from "../model/Step";
import { RomanicNumber } from "../model/RomanicNumber";
import { Explanation } from "../model/Explanation";
import { FoundWrittenNumber } from "../model/FoundWrittenNumber";
import { SplittedNumber } from "../model/SplittedNumber";

@Injectable()
export class CallGameService {
    private stepIndex: number = 1;

    private WrittenNumbers: Array<WrittenNumber> = new Array<WrittenNumber>();
    private RomanicNumbers: Array<RomanicNumber> = new Array<RomanicNumber>();
    private HiddenRomanicNumbers: Array<RomanicNumber> = new Array<RomanicNumber>();

    constructor() {
        this.InitiateWrittenNumbers();
        this.InitiateRomanicNumbers();
        this.InitiateHiddenRomanicNumber();
        var number = new SplittedNumber("");
        number.test();
    }

    public solve(assignment: string): Solution {
        console.clear();
        this.stepIndex = 1;
        var solution = new Solution();

        




        // solution = this.solveNumbersWhichAppearInWithinWords(assignment, solution);

        // solution = this.solveNumericNumbers(assignment, solution);
        // solution = this.solveRomanicNumbers(assignment, solution);
        // solution = this.SolveHiddenRomanicNumbers(assignment, solution);

        return solution;
    }

    private solveNumbersWhichAppearInWithinWords(assignment: string, solution: Solution): Solution {
        var step = new Step("Tel alle getallen die je ziet staan in de bewerking, zowel geschreven als in cijfers.");
        assignment = assignment.replace("ë", "e").toLowerCase();

        step.Items = this.SearchIndexesOfWordInLowerCaseInAssigment(assignment, this.WrittenNumbers, false);
        step.Items.forEach(item => console.log(this.convertWrittenNumberToNumericNumber(item.Text, this.WrittenNumbers)));
        console.log(step);

        solution.Steps.push(step);
        return solution;
    }

    private solveNumbersWhichAppearOverDifferentWords(assignment: string, solution: Solution): Solution {


        return solution;
    }

    private isWrittenNumber(word: string): boolean {
        console.log(word);
        console.log(this.WrittenNumbers.filter(wn => wn.Text.toLowerCase().indexOf(word.toLowerCase()) !== -1));
        return this.WrittenNumbers.filter(wn => word.indexOf(wn.Text) !== -1).length > 0;
    }

    private convertWrittenNumberToNumericNumber(writtenNumber: string, dozens: Array<WrittenNumber>): Number {
        var result: Number = 0;
        console.clear();

        var writtenNumber = "zevenhonderdvijftien miljard tweehonderdvijfendertig miljoen vierhonderd duizend zeshonderd veertien";
        console.log(writtenNumber);

        var miljards = new SplittedNumber(writtenNumber.split("miljard")[0]);
        console.log("miljarden: " + miljards.result?.toString());

        // -> honderdtallen, tientallen en eenheden uithalen
        /*
        var miljoenen = new SplittedNumber(writtenNumber.split("miljard")[1].split("miljoen")[0].trim());
        console.log("miljoenen: " + miljoenen);

        // -> honderdtallen, tientallen en eenheden uithalen
        var duizendtallen = new SplittedNumber(writtenNumber.split("miljard")[1].split("miljoen")[1].split("duizend")[0].trim());
        console.log("duizenden: " + duizendtallen);

        // -> honderdtallen, tientallen en eenheden uithalen
        var honderden = new SplittedNumber(writtenNumber.split("miljard")[1].split("miljoen")[1].split("duizend")[1].trim());
        console.log("honderden : " + honderden);
        */



        return result;
    }

    private solveRomanicNumbers(assignment: string, solution: Solution): Solution {
        var step = new Step("Tel alle romeinse cijfers op (I, V, X, L, C, D, M). Ook de geldige combinaties als VI, IX en CC");
        console.log(step.Name);
        var words = assignment.split(" ");
        words.forEach(word => {
            var result = 0;
            var wordLine = "Het woord " + word + " bevat ";
            var explanation = new Explanation();
            word.split("").forEach(character => {
                var romanicCharacters = this.RomanicNumbers.map(rn => rn.Text);
                if (romanicCharacters.indexOf(character) !== -1) {
                    var romanicCharacter = this.RomanicNumbers.find(rn =>
                        rn.Text.charCodeAt(0) === character.charCodeAt(0));
                    var numericValue = romanicCharacter?.Value;
                    if (numericValue !== undefined) {
                        result += numericValue;
                        explanation.Lines.push(this.FormatExplantionForRomanicCharacters(romanicCharacter?.Explanation));
                    }
                }
            });
            wordLine += ".";
            if (wordLine === word + "bevat.") {
                wordLine == "";
            }

            this.stepIndex++;
        });

        solution.Steps.push(step);
        return solution;
    }

    private SolveHiddenRomanicNumbers(assignment: string, solution: Solution): Solution {
        var step = new Step("Tel alle romeinse cijfers op die verborgen zitten in cijfers en letters");
        var words = assignment.split(" ");
        var wordLine = "";
        words.forEach(word => {
            var result = 0;
            wordLine = word + " => ["
            word.split("").forEach(character => {
                var hiddenRomanicCharacters = this.HiddenRomanicNumbers.map(rn => rn.Text);
                if (hiddenRomanicCharacters.indexOf(character) !== -1) {
                    var hiddenRomanicCharacter = this.HiddenRomanicNumbers.find(rn =>
                        rn.Text.charCodeAt(0) === character.charCodeAt(0));
                    var numericValue = hiddenRomanicCharacter?.Value;
                    if (numericValue !== undefined) {
                        result += numericValue;
                        wordLine += ", " + this.FormatExplantionForHiddenRomanicCharacters(hiddenRomanicCharacter?.Explanation);
                    }
                }
            });
            wordLine = wordLine.replace(word + " => [, ", word + " => [ ");
            wordLine += " ]";
            this.stepIndex++;
        });

        solution.Steps.push(step);
        return solution;
    }

    private SearchIndexesOfWordInLowerCaseInAssigment(
        assignment: string,
        numberToSearch: Array<WrittenNumber>,
        crossWordSearch: Boolean): Array<FoundWrittenNumber> {
        assignment = assignment.toLowerCase();
        var result = new Array<FoundWrittenNumber>();
        console.log(crossWordSearch);
        if (crossWordSearch) {
            numberToSearch.forEach(nts => {
                var numberCombinations = this.CreateWordCombinations(nts);
                numberCombinations.forEach((key, value) => {
                    var indexOfKeyInAssignment = assignment.indexOf(value.toString());
                    if (indexOfKeyInAssignment !== -1) {
                        assignment = assignment.replaceAll(value, "<b>" + value + "</b>");
                        var writtenNumber = this.WrittenNumbers.filter(wn => wn.Text == nts.Text)[0];
                        result.push(new FoundWrittenNumber(indexOfKeyInAssignment, writtenNumber, assignment));
                    }
                });
            });
        }
        else {
            var words = assignment.split(" ");
            words.forEach(word => {
                console.log(word);
                if (isNaN(Number(word))) {
                    var foundWrittenNumber = null;
                    var isFoundWrittenNumberAlreadyPushed = false;
                    var writtenNumber = this.WrittenNumbers
                        .find(wn => wn.Text.toLowerCase().indexOf(word.toLowerCase()) !== -1);
                    console.log(writtenNumber);
                    if (writtenNumber !== undefined) {
                        foundWrittenNumber = new FoundWrittenNumber(assignment.indexOf(word), writtenNumber, assignment);
                        isFoundWrittenNumberAlreadyPushed = result.indexOf(foundWrittenNumber) !== -1;
                    }
                    if (writtenNumber !== undefined && !isFoundWrittenNumberAlreadyPushed && foundWrittenNumber !== null) {
                        result.push(foundWrittenNumber);
                    }
                }
            });
        }
        return result.sort((a, b) => a.IndexOfOccurrence - b.IndexOfOccurrence);
    }

    private CreateWordCombinations(numberToSearch: WrittenNumber): Map<string, number> {
        var combinations = new Map<string, number>();

        combinations.set(numberToSearch.Text, numberToSearch.Value);

        for (var indexOfSpacing = 1; indexOfSpacing <= numberToSearch.Text.length - 1; indexOfSpacing++) {
            var key =
                numberToSearch.Text.substring(0, indexOfSpacing) + " " +
                numberToSearch.Text.substring(indexOfSpacing);
            var value = numberToSearch.Value;
            combinations.set(key, value);
        }

        return combinations;
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
        this.RomanicNumbers.push(new RomanicNumber(1, "I", 1, "-I -> 1"));
        this.RomanicNumbers.push(new RomanicNumber(2, "V", 5, "-V -> 5"));
        this.RomanicNumbers.push(new RomanicNumber(3, "X", 10, "-X -> 10"));
        this.RomanicNumbers.push(new RomanicNumber(4, "L", 50, "-L -> 50"));
        this.RomanicNumbers.push(new RomanicNumber(5, "C", 100, "-C -> 100"));
        this.RomanicNumbers.push(new RomanicNumber(6, "D", 500, "-D -> 500"));
        this.RomanicNumbers.push(new RomanicNumber(7, "M", 1000, "-M -> 1000"));
    }

    private InitiateHiddenRomanicNumber() {
        this.HiddenRomanicNumbers.push(new RomanicNumber(1, "B", 1, "- B -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(2, "D", 1, "- D -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(3, "E", 51, "- E -> 1 x I -> 1 en 1 x L -> 50 => 51"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(4, "F", 1, "- F -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(5, "G", 100, "- G -> 1 x C => 100"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(6, "H", 2, "- H -> 2 x I -> 1 => 2"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(7, "K", 1, "- K -> I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(8, "L", 1, "- L -> I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(9, "M", 7, "- M -> 2 x I -> 2 en V -> 5 => 7"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(10, "N", 2, "- N -> 2 x I -> 1 => 2"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(11, "O", 100, "- O -> 1 x C => 100"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(12, "P", 1, "- P -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(13, "Q", 100, "- Q -> 1 x C => 100"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(14, "R", 1, "- R -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(15, "T", 1, "- T -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(16, "W", 10, "- W -> 2 x V => 10"));

        this.HiddenRomanicNumbers.push(new RomanicNumber(17, "b", 1, "- b -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(18, "d", 1, "- d -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(19, "h", 1, "- h -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(20, "k", 1, "- k -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(21, "l", 1, "- l -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(22, "p", 1, "- p -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(23, "q", 1, "- q -> 1 x I => 1"));

        this.HiddenRomanicNumbers.push(new RomanicNumber(24, "0", 1, "- 0 -> 1 x I => 1"));
        this.HiddenRomanicNumbers.push(new RomanicNumber(25, "1", 1, "- 1 -> 1 x I => 1"));
    }

    private FormatExplantionForRomanicCharacters(fullExplanation: string | undefined): string {
        if (fullExplanation != undefined) {
            return fullExplanation?.replace("-", "het teken ").replace("->", "heeft als waarde");
        }
        return "";
    }

    private FormatExplantionForHiddenRomanicCharacters(fullExplanation: string | undefined): string {
        var formattedExplanation = "";
        if (fullExplanation != undefined) {
            var sign = fullExplanation.split(" -> ")[0].replace("- ", "");
            var explanationAndResult = fullExplanation.split(" -> ")[1];
            var explanation = explanationAndResult.split(" => ")[0];
            var result = explanationAndResult.split(" => ")[1];
            var resultText = "Het symbool " + sign + " bevat " + explanation + " en geeft als resultaat " + result;
            return resultText;
        }

        return formattedExplanation;
    }
}