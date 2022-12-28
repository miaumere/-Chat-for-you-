import { BaseComponent } from 'src/app/core/base.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../services/models/user.model';

type themeType = 'light' | 'dark';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public _authService: AuthService) {}

  ngOnInit(): void {
    this.getTheme();
  }

  ngAfterViewInit(): void {}

  getTheme() {
    if (!localStorage.getItem('theme')) {
      const isThemeDarkFromMedia = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.className = isThemeDarkFromMedia
        ? 'dark'
        : 'light';
    } else {
      document.documentElement.className = localStorage.getItem(
        'theme'
      ) as themeType;
    }
  }

  setTheme(theme: themeType) {
    localStorage.setItem('theme', theme);
    this.getTheme();
  }
}
