import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Class } from '../model/class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  classes: FirebaseListObservable<Class[]>;

  constructor(db: AngularFireDatabase) {
    this.classes = db.list('/classes');
  }

  ngOnInit() { }

}
