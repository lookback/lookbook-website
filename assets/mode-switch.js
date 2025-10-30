/**
 * Wrap radio inputs with this to change the main stylesheet to dynamically when the inputs are changed.
 */
class ModeSwitch extends HTMLElement {
  STORE_KEY = 'lookbook.mode';

  storage = window.sessionStorage;

  DEFAULT_MODE = 'dashboard';

  constructor() {
    super();

    this.stylesheet = document.getElementById('main-sheet');

    this.addEventListener('change', (evt) => {
      const newMode = evt.target.value;
      const currMode = this.currentMode();

      if (currMode === newMode) return;

      this.setMode(newMode);
    });

    const storedMode = this.getStoredMode();

    if (storedMode) {
      this.setMode(storedMode);
    }
  }

  connectedCallback() {
    const storedMode = this.getStoredMode() || this.DEFAULT_MODE;

    for (const radio of this.querySelectorAll('input')) {
      radio.checked = radio.value == storedMode;
    }
  }

  setMode(mode) {
    const [root] = this.stylesheet.href.split('/assets');
    this.stylesheet.href = root + `/assets/site-${mode}.css`;
    this.storage.setItem(this.STORE_KEY, mode);
  }

  getStoredMode() {
    const item = this.storage.getItem(this.STORE_KEY);
    return item && item != 'null' ? item : null;
  }

  currentMode() {
    return this.stylesheet.href.match(/site-(\w+)/)?.at(1);
  }
}

customElements.define('mode-switch', ModeSwitch);
