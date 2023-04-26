import {ScrollLock} from './../../utils/scroll-lock.js';
import {FocusLock} from './../../utils/focus-lock';

export class MobileMenu {
  constructor() {
    this._header = document.querySelector('[data-mobile-menu]');
    this._headerContainer = document.querySelector('[data-mobile-menu-container]');
    this._mobileMenu = document.querySelector('[data-mobile-menu]');
    this._burger = document.querySelector('[data-burger]');
    this._logo = document.querySelector('[data-logo]');
    this._scrollLock = new ScrollLock();
    this._focusLock = new FocusLock();
    this._isMenuOpen = false;

    this._onBurgerClick = this._onBurgerClick.bind(this);
    this._onDocumentKeydown = this._onDocumentKeydown.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onLinkClick = this._onLinkClick.bind(this);
  }

  init() {
    if (!this._burger) {
      return;
    }

    this._burger.addEventListener('click', this._onBurgerClick);
  }

  _openMenu() {
    this._isMenuOpen = true;
    this._header.classList.add('is-open');
    this._scrollLock.disableScrolling();
    this._mobileMenu.insertBefore(this._logo, this._mobileMenu.firstChild);
    document.addEventListener('keydown', this._onDocumentKeydown);
    document.addEventListener('click', this._onDocumentClick);
    document.addEventListener('click', this._onLinkClick);
    this._focusLock.lock('[data-mobile-menu]');
    if (window.ls) {
      window.ls.stop();
    }
  }

  _closeMenu() {
    this._isMenuOpen = false;
    this._header.classList.remove('is-open');
    this._scrollLock.enableScrolling();
    this._focusLock.unlock('[data-mobile-menu]');
    this._headerContainer.insertBefore(this._logo, this._headerContainer.firstChild);
    document.removeEventListener('keydown', this._onDocumentKeydown);
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('click', this._onLinkClick);
    if (window.ls) {
      window.ls.start();
    }
  }

  _onBurgerClick() {
    if (this._isMenuOpen) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      this._closeMenu();
    }
  }

  _onDocumentClick(evt) {
    if (evt.target.hasAttribute('data-close-menu')) {
      this._closeMenu();
    }
  }

  _onLinkClick(evt) {
    if (evt.target.hasAttribute('href')) {
      this._closeMenu();
    }
  }
}
