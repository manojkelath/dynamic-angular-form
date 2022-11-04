import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-formarray-example';

  form:FormGroup;

  constructor(private fb:FormBuilder){
    this.formInit();
    this.constructEmailForm()
  }

  formInit(){
    this.form = this.fb.group({
      emails: this.fb.array([])
    })

    console.log(this.form.getRawValue());
  }

  constructEmailForm(){
    // this may come from an input
    const emailData = [
      {
        id: "1",
        emailAddress : "manoj@manoj.com"
      },
      {
        id: "2",
        emailAddress : "manoj2@manoj.com"
      }
    ];
    emailData.forEach((email)=>{
      this.emails.push( this.fb.group({
        name: [email.id],
        email: email.emailAddress
      }));
    });


  }

  private addNewEmailControl(): FormGroup {
    return this.fb.group({
      name: ['Email'],
      email: ''
    });
  }

  addEmail(): void {
    this.emails.push(this.addNewEmailControl());
  }

  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }


  public get emails(){
    return this.form.get('emails') as FormArray;
  }


}
