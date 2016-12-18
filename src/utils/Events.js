export default class Events {
  constructor() {
    this.bindEvents()
  }

  bindEvents () {
    window.addEventListener('dragenter', function(e) {
      document.querySelector('.dropzone').classList.add('show');
    });
  }
}