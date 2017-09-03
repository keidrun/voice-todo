const electron = require('electron');
const { BrowserWindow, app } = electron;

class AutorWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 200,
      height: 200
    });
    this.loadURL(url);
    this.on('closed', this.onClosed.bind(this));
  }

  onClosed() {
    this.AutorWindow = null;
  }
}

module.exports = AutorWindow;
