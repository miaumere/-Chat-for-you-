import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss'],
})
export class InitialPageComponent {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    chatRoom: new FormControl(null),
  });

  isNewRoomFormVisible = false;
  constructor(private _router: Router) {}

  goToChatRoom() {
    if (!this.form.valid) {
      console.log('invalid');
    }

    this._router.navigate(['/', this.form.get('chatRoom')?.value]);
  }

  showNewRoomForm() {}
}
