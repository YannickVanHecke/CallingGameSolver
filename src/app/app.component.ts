import { Component } from '@angular/core';

import { CallGameService } from '../services/CallGameService';
import { Solution } from '../model/Solution';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CallGameService]
})
export class AppComponent {
  title = 'Los het belspel op';
  solution: Solution = new Solution();
  


  public Assignment: string = "";


  /**
   *
   */
  constructor(private callGameService: CallGameService) {

    this.Assignment = "VANNACHT WEER" + "<br/>EEN WINNAAR!<br/><br/>DRIEëndertig gedeeld door 3 + 199 - 9 + TIEN";
    
  }

  public solve() {
    this.solution = this.callGameService.solve(this.Assignment);
    console.log(this.solution);
  }
}
