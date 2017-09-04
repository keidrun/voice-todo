const electron = require('electron');
const { BrowserWindow, app } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 350,
      height: 600,
      minWidth: 350,
      maxWidth: 350
    });
    this.loadURL(url);
    this.on('closed', this.onClosed.bind(this));
  }

  onClosed() {
    app.quit();
  }

}

module.exports = MainWindow;
