import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
// import { AlertService } from '../services/alert.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ 
    selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
    templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
      //  private alertService: AlertService,
        private _snackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
       // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                    this._snackbar.open('You successfully logged in', 'Ok', { duration: 3000 });
                },
                error: error => {
                    this._snackbar.open('Login failed', 'ERROR', { duration: 3000 });
                   // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}