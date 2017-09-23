const electron = require("electron");
const { BrowserWindow } = electron;

class SubWindow extends BrowserWindow {
  constructor(url, env) {
    const range = {
      width: 300,
      height: 400
    };
    if (env === "production") {
      range.resizable = false;
    }
    super(range);
    this.loadURL(url);
  }
}

module.exports = SubWindow;
