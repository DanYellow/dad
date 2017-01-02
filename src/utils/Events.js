export default class Events {
  constructor() {
    this.bindEvents();
  }

  bindEvents () {
    window.addEventListener('dragenter', function(e) {
      if (!document.querySelector('.dropzone')) { return null; }
      document.querySelector('.dropzone').classList.add('show');
    });
  }
}