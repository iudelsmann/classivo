import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  classes: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
    this.classes = db.list('/classes');
  }

  ngOnInit() { }

}
