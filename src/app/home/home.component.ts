import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addUrl: any;
  verifyUrl: any;
  postImageForVerification: any;

  awsCollectionList: any;
  awsCollectionError: any;
  verificationResultIndividual:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
        this.http.get<any>('http://localhost:8080/api/v1/individual/white-collection-stat').subscribe(data => {
            this.awsCollectionList = data;
        })
  }

  awsVerifyImage(): void{
    console.log('Image uploaded');

    var formData: any = new FormData();
    formData.append("file", this.postImageForVerification);
    const headers = { 'content-type': 'application/json'}
    const body=formData;
    console.log(body);

    this.http.post('', body, {'headers':headers}).subscribe(
      (response) => this.verificationResultIndividual=response,
      (err) => console.log(err)
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

		reader.onload = (_event) => {
			this.addUrl = reader.result;
		}
	}

	selectVerifyFile(event: any) { //Angular 11, for stricter type
  		if(!event.target.files[0] || event.target.files[0].length == 0) {
  			return;
  		}

  		var mimeType = event.target.files[0].type;

  		if (mimeType.match(/image\/*/) == null) {
  			return;
  		}

  		var reader = new FileReader();
  		reader.readAsDataURL(event.target.files[0]);

      this.postImageForVerification=event.target.files[0];
      console.log("Image added!");

  		reader.onload = (_event) => {
  			this.verifyUrl = reader.result;
  		}
  	}
}
