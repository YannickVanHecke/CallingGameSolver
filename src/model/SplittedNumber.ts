import { WrittenNumber } from "./WrittenNumber";

export class SplittedNumber {
    
    public Hundreds?: number;
    public Dozens?: number;
    public Units?: number;

    private writtenDozens = new Map<string, number>;
    private writtenUnits = new Map<string, number>;

    constructor (text: String) {
        this.initiateWrittenDozens();
        this.initiateWrittenUnits();
        console.log("text: " + text);
        console.log(text + '.indexOf(' + "honderd" + ') --> ' + text.indexOf("honderd"));
        this.Hundreds = this.GetWrittenNumberValue(this.writtenUnits, text.split("honderd")[0]);
        this.Dozens = this.GetWrittenNumberValue(this.writtenDozens, text.split("honderd")[1]);
    

        console.log(this.Hundreds);
        console.log(this.Dozens);
        console.log(this.Units);
    }

    private GetWrittenNumberValue(collection: Map<string, number>, number: string): number | undefined {
        var result = 0;
        var writtenDozens = collection.get(number);
        if (!writtenDozens) {
            if (number.indexOf("tien") !== -1) {
                console.log("eenheden: " + number.substring(0, number.indexOf("tien")));
            }
        }
        else {

        }

        return collection.get(number);
    }

    private initiateWrittenDozens() {
        this.writtenDozens.set("tien", 10);
        this.writtenDozens.set("elf", 11);
        this.writtenDozens.set("twaalf", 12);
        this.writtenDozens.set("dertien", 13);
        this.writtenDozens.set("veertien", 14);
        this.writtenDozens.set("twintig", 20);
        this.writtenDozens.set("dertig", 30);
        this.writtenDozens.set("veertig", 40);
    }

    private initiateWrittenUnits() {
        this.writtenUnits.set("nul", 0); 
        this.writtenUnits.set("een", 1);
        this.writtenUnits.set("twee", 2);
        this.writtenUnits.set("drie", 3);
        this.writtenUnits.set("vier", 4);
        this.writtenUnits.set("vijf", 5);
        this.writtenUnits.set("zes", 6);
        this.writtenUnits.set("zeven", 7);
        this.writtenUnits.set("acht", 8);
        this.writtenUnits.set("negen", 9);
    }
}