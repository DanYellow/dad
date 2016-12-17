export default class Events {
  constructor() {
    this.bindEvents()
  }

  bindEvents () {
    window.addEventListener('dragenter', function(e) {
      document.querySelector('.dropzone').classList.add('show');
    });

    window.addEventListener('dragleave', function(e) {
      // console.log('ffzfzefz')
      // document.querySelector('.dropzone').classList.remove('show');
    });
  }
}