import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //template: `<p>This my HTML !!
  //</p>
  //`,
  styleUrls: ['./home.component.scss'],
  //styles: [`
  //p {font-weight:bold;}
  //div {color:gray;}
  //`]
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})

  export class HomeComponent implements OnInit {
    itemCount: number;
    btnText = 'Add item';
    goalText = 'My first life goal';
    goals = [];
  
    constructor(private _data: DataService) {
      console.log("---------------------------> home constructor");
    }
  
    ngOnInit() {
      console.log("---------------------------> home ngOnInit");
      this._data.goal.subscribe(res => this.goals = res);
      this.itemCount = this.goals.length;
      //this._data.changeGoal(this.goals);
    }
  
    addItem() {
    // because : Appends new elements to an array, and returns the new length of the array
    //this.itemCount = this.goals.push(this.goalText);
      this.goals.push(this.goalText);
      this.goalText = '';
      this.itemCount = this.goals.length;
      this._data.changeGoal(this.goals);
    }
  
    removeItem(i) {
      this.goals.splice(i, 1);
      this._data.changeGoal(this.goals);
    }



}
