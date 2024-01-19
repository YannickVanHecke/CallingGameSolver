import { Pipe, PipeTransform } from '@angular/core';
import { SolutionItem } from "../model/SolutionItem";
@Pipe({name: 'TotalPipe'})
export class TotalPipe implements PipeTransform {
    transform(solutionItems: SolutionItem[]) {
        var total = 0;
        solutionItems.forEach(solutionItem => {
            total += solutionItem.Solution;
        });

        return total;
    }
    
}