import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from "./core/core.module";
import { HeaderComponent } from './core/components/header/header.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CoreModule, HeaderComponent,],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})



export class AppComponent {
  title = 'awesome-components';
}
