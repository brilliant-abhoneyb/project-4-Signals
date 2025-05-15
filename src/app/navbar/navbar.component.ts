import { Component} from '@angular/core';
import { TranslationService } from '../service/translation.service';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public translation: TranslationService) {}

  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value as 'en' | 'ru' | 'ja';
    this.translation.setLanguage(lang);
  }
}
