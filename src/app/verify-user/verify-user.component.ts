import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  postImageForVerification: any;
  verifyUrl: any;
  verificationResultIndividual:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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

}
