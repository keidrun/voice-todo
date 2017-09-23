const electron = require("electron");
const { BrowserWindow, app } = electron;

class MainWindow extends BrowserWindow {
  constructor(url, env) {
    const range = {
      width: 350,
      height: 600
    };
    if (env === "production") {
      range.minWidth = 350;
      range.maxWidth = 350;
    }
    super(range);
    this.loadURL(url);
    this.on("closed", this.onClosed.bind(this));
  }

  onClosed() {
    app.quit();
  }
}

module.exports = MainWindow;
