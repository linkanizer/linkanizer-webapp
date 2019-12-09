import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { RequestStateEnum } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentUser$ = this.authService.currentUser;

  public emailControl: FormControl;
  public requestState = RequestStateEnum.DEFAULT;
  public RequestStateEnum = RequestStateEnum;

  constructor(private authService: AuthService) {
    this.emailControl = new FormControl('', [Validators.email, Validators.required]);
  }

  ngOnInit() {

  }

  request_login_email() {
    this.requestState = RequestStateEnum.LOADING;

    this.authService.request_login_email(this.emailControl.value)
      .subscribe(
        success => {
          this.requestState = RequestStateEnum.SUCCESS;
        },
        error => {
          this.requestState = RequestStateEnum.ERROR;
        }
      );
  }

}
