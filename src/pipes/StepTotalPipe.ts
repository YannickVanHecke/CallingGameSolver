import { Pipe, PipeTransform } from '@angular/core';
import { SolutionItem } from "../model/SolutionItem";
import { Step } from '../model/Step';
@Pipe({name: 'StepTotalPipe'})
export class StepTotalPipe implements PipeTransform {
    transform(items: SolutionItem[]) {
        console.log(items);
        var total = 0;
        items.forEach(item => {
                total += item.Solution;
            });

        return total;
        
    }
}