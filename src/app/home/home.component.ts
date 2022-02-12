import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  addUrl: any;
  awsCollectionList: any;
  awsCollectionError: any;
  newUserURL:any="http://localhost:8080/api/v1/individual";

  firstName:any;
  middleName:any;
  lastName:any;
  identification:any;
  file:any;
  collectionType:any;

  uploadProgressMessage:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
        formData:null;
        this.http.get<any>('http://localhost:8080/api/v1/individual/white-collection-stat').subscribe(data => {
            this.awsCollectionList = data;
        })
  }

  submitForm(): void {
    let formData = new FormData();
    formData.append('file', this.file);
    this.uploadProgressMessage="Uploading image to AWS ...";

    const params = new HttpParams().set('firstName', this.firstName)
                                   .set('lastName',this.lastName)
                                   .set('middleName',this.middleName)
                                   .set('identification',this.identification)
                                   .set('collectionType',this.collectionType);

    this.http.post<any>(this.newUserURL, formData, {params})
        .subscribe(
            {
              next: data => {
                this.uploadProgressMessage="Image Uploaded to AWS successfully!";
                this.http.get<any>('http://localhost:8080/api/v1/individual/white-collection-stat').subscribe(data => {
                    this.awsCollectionList = data;
                });
              },
              error: error => {
                this.uploadProgressMessage="Failed to upload image in AWS!";
              }
            }
           );


  }

  selectAddFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		this.file=event.target.files[0];

		reader.onload = (_event) => {
			this.addUrl = reader.result;
		}
	}
}
