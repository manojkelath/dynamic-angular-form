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
        id: email.id,
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
    // use this to map directly to an object if required.
    console.log(this.form.getRawValue().emails);
  }

  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }


  public get emails(){
    return this.form.get('emails') as FormArray;
  }


}
