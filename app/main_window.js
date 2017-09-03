const electron = require('electron');
const { BrowserWindow, app } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({});
    this.loadURL(url);
    this.on('closed', this.onClosed.bind(this));
  }

  onClosed() {
    app.quit();
  }

}

module.exports = MainWindow;
