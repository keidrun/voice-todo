const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let inputWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on("closed", () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createInputWindow() {
  inputWindow = new BrowserWindow({
    width: 300,
    height: 300
  });
  inputWindow.loadURL(`file://${__dirname}/input.html`);
  inputWindow.on("closed", () => (inputWindow = null));
}

// Create a input window.
ipcMain.on("inputWindow:create", event => {
  createInputWindow();
});

// Send a sentence to a main window.
ipcMain.on("sentence:insert", (event, sentence) => {
  mainWindow.webContents.send("sentence:insert", sentence);
  inputWindow.close();
});

// Menu
const menuTemplate = [
  {
    label: "Menu",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

// // Adjust Menu for Mac
// if (process.platform === "darwin") {
//   menuTemplate.unshift({});
// }

// Show Developer Tools
if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Develop",
    submenu: [
      {
        label: "Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
