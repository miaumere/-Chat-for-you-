import { AuthService } from './../../../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { RoomService } from 'src/app/core/services/room/room.service';
import { RoomDto } from 'src/app/core/services/models/room.model';
import { ILoginRequest } from 'src/app/core/services/models/login-request.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BaseComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  newUserForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    retryPassword: new FormControl(null, [Validators.required]),
  });

  isNewRoomFormVisible = false;

  availableRooms: RoomDto[] = [];
  passwordsError = false;
  loginError = false;

  constructor(private _router: Router, private _authService: AuthService) {
    super();
  }

  ngOnInit(): void {}

  login(): void {
    if (
      !this.form.valid ||
      !this.form.value.username ||
      !this.form.value.password
    ) {
      return;
    }

    this.loginError = false;

    const request: ILoginRequest = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.subscriptions$.add(
      this._authService.login(request).subscribe({
        next: (t) => {
          console.log(t);
          this._router.navigate(['/chat']);
        },
        error: (e) => {
          console.log(e);

          this.loginError = true;
        },
      })
    );
  }

  createNewUser(): void {
    if (
      this.newUserForm.value.password !== this.newUserForm.value.retryPassword
    ) {
      this.passwordsError = true;
      return;
    }
    if (
      !this.newUserForm.valid ||
      !this.newUserForm.value.username ||
      !this.newUserForm.value.password
    ) {
      this.loginError = true;

      return;
    }
    this.passwordsError = false;
    this.loginError = false;

    const request: ILoginRequest = {
      username: this.newUserForm.value.username,
      password: this.newUserForm.value.password,
    };

    this.subscriptions$.add(
      this._authService.register(request).subscribe({
        next: () => {
          this._router.navigate(['/chat']);
        },
        error: (e) => {
          console.error(e);
        },
      })
    );
  }
}
