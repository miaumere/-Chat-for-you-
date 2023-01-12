import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Chat';

  globalLoaderIsVisible = false;

  constructor(private _loaderService: LoaderService) {}

  ngOnInit(): void {
    this._loaderService.isLoaderVisible.subscribe((isVisible) => {
      this.globalLoaderIsVisible = isVisible;
    });
  }
}
