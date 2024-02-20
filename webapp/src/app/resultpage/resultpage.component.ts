import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';



@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.scss']
})
export class ResultpageComponent {
  ngOnInit() {
    setTimeout(() => {
      window.location.reload();
    }, 18000); // refresh page after 10 seconds
  }
}
