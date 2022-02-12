import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {


  verifyUrl: any;
  verificationResultIndividual:any;

  collectionType:any;
  postImageForVerification: any;
  verifyImageURL:any="http://localhost:8080/api/v1/individual/verify";
  uploadProgressMessage:any;

  verificationResult:any;

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

      let formData = new FormData();
      formData.append('file', this.postImageForVerification);
      this.uploadProgressMessage="Verifying image to AWS ...";

      const params = new HttpParams().set('collectionType', this.collectionType)

      this.http.post(this.verifyImageURL, formData, {params})
        .subscribe(
          {
            next: data => {
              this.verificationResult = data;
              if(data==null)
              {
                this.uploadProgressMessage="Face not found in "+this.collectionType;
              }
              else if(this.verificationResult.firstName!=null)
              {
                this.uploadProgressMessage="Face found";
              }
              else
              {
                this.uploadProgressMessage="Face not found";
              }
            },
            error: error => {
              this.uploadProgressMessage="Failed to upload image in AWS!";
            }
          }
        );
    }

}
