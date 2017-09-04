const electron = require('electron');
const { BrowserWindow, app } = electron;

class SubWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 300,
      height: 350,
      resizable: false
    });
    this.loadURL(url);
    this.on('closed', this.onClosed.bind(this));
  }

  onClosed() {
    this.SubWindow = null;
  }
}

module.exports = SubWindow;
