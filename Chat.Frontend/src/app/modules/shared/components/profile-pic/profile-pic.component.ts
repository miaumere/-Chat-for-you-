import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-pic [username]',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent {
  @Input() username: string = '';
}
