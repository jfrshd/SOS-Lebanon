import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var slick: any;
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  info = [
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
    {path: '../../../../assets/pictures/Ellipse 4.png',name:'Name',lastName:'Lastname',job :'Developer',twitter:'link',linkedin:'link'},
 
]

  constructor() { }

 

  ngOnInit() {
   
  }
}
