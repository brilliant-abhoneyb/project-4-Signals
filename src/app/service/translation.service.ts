import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  language = signal<'en' | 'ru' | 'ja'>('en');
  
  constructor() { }

  private readonly TRANSLATIONS = {
    en: {
      main: 'Main',
      catalog: 'Catalog',
      about: 'About',
      product: 'Product',
      water: 'Water',
      rice: 'Rice',
      sugar: 'Sugar',
      porridge: 'Porridge',
      bread: 'Bread',
      quantity: 'Quantity',
      price: 'Price',
      addProduct: 'Add Product',
      updateProduct: 'Update',
      saleNumber: 'Sale Number',
      code: 'Code',
      name: 'Name',
      total: 'Total',
      action: 'Action',
      edit: 'Edit',
      delete: 'Delete',
      totalQuantity: 'Total Quantity',
      totalSum: 'Total Sum',
      totalTax: 'Total Tax',
      totalNet: 'Total Net'
    },
    ru: {
      main: 'Главная',
      catalog: 'Каталог',
      about: 'О проекте',
      product: 'Продукт',
      water: 'Вода',
      rice: 'Рис',
      sugar: 'Сахар',
      porridge: 'Каша',
      bread: 'Хлеб',
      quantity: 'Количество',
      price: 'Цена',
      addProduct: 'Добавить',
      updateProduct: 'Обновить',
      saleNumber: '№ Продажи',
      code: 'Код',
      name: 'Название',
      total: 'Итого',
      action: 'Действие',
      edit: 'Изменить',
      delete: 'Удалить',
      totalQuantity: 'Итоговое количество',
      totalSum: 'Итоговая сумма',
      totalTax: 'Налог',
      totalNet: 'Прибыль'
    },
    ja: {
      main: 'メイン',
      catalog: 'カタログ',
      about: '約',
      product: '製品',
      water: '水',
      rice: 'ご飯',
      sugar: '砂糖',
      porridge: 'お粥',
      bread: 'パン',
      quantity: '数量',
      price: '価格',
      addProduct: '追加',
      updateProduct: '更新',
      saleNumber: '販売番号',
      code: 'コード',
      name: '名前',
      total: '合計',
      action: '操作',
      edit: '編集',
      delete: '削除',
      totalQuantity: '合計数量',
      totalSum: '合計金額',
      totalTax: '税金',
      totalNet: '純合計'
    }
  };

  translations = computed(() => this.TRANSLATIONS[this.language()]);

  setLanguage(lang: 'en' | 'ru' | 'ja') {
    this.language.set(lang);
  }
}
