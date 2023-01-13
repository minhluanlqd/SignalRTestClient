import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      token: ['TEST TEST TOKEN 123']
    })
  }

  onSubmitSignUp() {
    if(this.signUpForm.valid) {
      // Send the obj to the backend to validate
      console.log(this.signUpForm.value);
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.signUpForm.reset();
          this.router.navigate(["login"]);
        },
        error: (err) => {
          console.log(err?.error.message);
        },
      })
    }
    else {
      // throw error
    }
  }
}
