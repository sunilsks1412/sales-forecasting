import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})




export class HomeComponent {
  showWarning = false;
  // router: any;
  periodicityOptions = ['Daily', 'Monthly', 'Yearly'];
  numerixOptions: string[] = [];
  selectedPeriodicity: string | null = null;
  selectedNumerix: number | null = null;
  uploadSuccessful: boolean = false;
  
  constructor(private http: HttpClient,
    private router: Router) {}

  
  uploadFile() {
    const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
  
    if (!fileUpload) {
      return; // handle case where file-upload element is null
    }
  
    const file = fileUpload.files?.[0]; // use optional chaining to safely access files array
    
    if (!file || (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      this.showWarning = true;
      return;
    }
  
    const formData = new FormData();
    // const data = {num: this.selectedNum, type: this.selectedType };
    formData.append('file', file);
    formData.append('selectedNumerix', this.selectedNumerix?.toString() ?? '');
    formData.append('selectedPeriodicity', this.selectedPeriodicity ?? '');

  
    this.http.post('http://127.0.0.1:5000/upload', formData).subscribe((response) => {
      console.log(response);
      this.uploadSuccessful = true;
      
    });



    this.router.navigate(['/resultpage']);

  }
////////////////////////////////////////////////////////////////////////////////////////////////


onPeriodicityChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const periodicity = target.value;

  if (periodicity === 'Daily') {
    this.numerixOptions = Array.from({length: 31}, (_, i) => (i + 1).toString());
  } else if (periodicity === 'Weekly') {
    this.numerixOptions = Array.from({length: 52}, (_, i) => (i + 1).toString());
  } else if (periodicity === 'Monthly') {
    this.numerixOptions = Array.from({length: 12}, (_, i) => (i + 1).toString());
  } else if (periodicity === 'Yearly') {
    this.numerixOptions = Array.from({length: 10}, (_, i) => (i + 1).toString());
  }

  this.selectedPeriodicity = periodicity;
  this.selectedNumerix = null;
}

onNumerixChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const numerix = parseInt(target.value);

  this.selectedNumerix = numerix;
}





}