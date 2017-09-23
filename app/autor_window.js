const electron = require("electron");
const { BrowserWindow } = electron;

class AutorWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 200,
      height: 200,
      resizable: false
    });
    this.loadURL(url);
  }
}

module.exports = AutorWindow;
