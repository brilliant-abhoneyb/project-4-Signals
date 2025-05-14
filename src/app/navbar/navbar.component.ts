import { Component, computed, signal } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  language = signal<'en' | 'ru' | 'ja'>('en');

  private readonly TRANSLATIONS = {
    en: {
      main: 'Main',
      catalog: 'Catalog',
      about: 'About'
    },
    ru: {
      main: 'Главная',
      catalog: 'Каталог',
      about: 'О проекте'
    },
    ja: {
      main: 'メイン',
      catalog: 'カタログ',
      about: '約'
    }
  };

  translations = computed(() => this.TRANSLATIONS[this.language()]);

  changeLanguage(event: Event) {
    const select = event.target as HTMLSelectElement;
    const lang = select.value as 'en' | 'ru' | 'ja';
    this.language.set(lang);
  }
}
