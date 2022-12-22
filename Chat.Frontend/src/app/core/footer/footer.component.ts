import { Component, OnInit } from '@angular/core';

type themeType = 'light' | 'dark';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  readonly date = new Date();

  ngOnInit(): void {
    this.getTheme();
  }

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
