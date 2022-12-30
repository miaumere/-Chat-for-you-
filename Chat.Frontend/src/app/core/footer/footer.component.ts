import { BaseComponent } from 'src/app/core/base.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

type themeType = 'light' | 'dark';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends BaseComponent implements OnInit {
  private readonly _themeStorageItemName = 'theme';
  constructor(public _authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.getTheme();
  }

  getTheme() {
    if (!localStorage.getItem(this._themeStorageItemName)) {
      const isThemeDarkFromMedia = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.className = isThemeDarkFromMedia
        ? 'dark'
        : 'light';
    } else {
      document.documentElement.className = localStorage.getItem(
        this._themeStorageItemName
      ) as themeType;
    }
  }

  setTheme(theme: themeType) {
    localStorage.setItem(this._themeStorageItemName, theme);
    this.getTheme();
  }

  logout() {
    this._authService.logout();
  }
}
