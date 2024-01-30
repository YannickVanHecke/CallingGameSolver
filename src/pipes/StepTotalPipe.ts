import { Pipe, PipeTransform } from '@angular/core';
import { WrittenNumber } from '../model/WrittenNumber';

@Pipe({name: 'StepTotalPipe'})
export class StepTotalPipe implements PipeTransform {
    transform(items: WrittenNumber[]) {
        console.log(items);
        var total = 0;
        items.forEach(item => {
                total += item.Value;
            });

        return total;
        
    }
}