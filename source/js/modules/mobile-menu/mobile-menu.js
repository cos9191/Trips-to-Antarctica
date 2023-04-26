import {ScrollLock} from './../../utils/scroll-lock.js';
import {FocusLock} from './../../utils/focus-lock';

const logoColors = {
  white: '#f9fbfd',
  black: '#011c40',
};

export class MobileMenu {
  constructor() {
    this._header = document.querySelector('[data-header]');
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
    this._onWindowResize = this._onWindowResize.bind(this);
  }

  init() {
    if (!this._burger) {
      return;
    }

    this._headerContainer.insertBefore(this._logo, this._headerContainer.firstChild);
    this._burger.addEventListener('click', this._onBurgerClick);
    this._onWindowResize();
  }

  _openMenu() {
    this._isMenuOpen = true;
    this._header.classList.add('is-open');
    this._scrollLock.disableScrolling();
    this._mobileMenu.insertBefore(this._logo, this._mobileMenu.firstChild);
    this._logo.style.color = logoColors.black;

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
    this._logo.style.color = logoColors.white;

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

  _onWindowResize() {
    const breakpointExpansion = window.matchMedia('(min-width:767px)');
    const breakpointShrinkage = window.matchMedia('(max-width:767px)');

    const breakpointChecker = () => {
      if (breakpointExpansion.matches) {
        this._logo.style.color = logoColors.white;
        this._mobileMenu.insertBefore(this._logo, this._mobileMenu.firstChild);
      }
      if (breakpointShrinkage.matches) {
        this._closeMenu();
      }
    };

    breakpointExpansion.addEventListener('change', breakpointChecker);
    breakpointChecker();
  }
}
