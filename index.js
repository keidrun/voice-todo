process.env.NODE_ENV = process.env.NODE_ENV || "production";
const config = require("./config");
process.env.GOOGLE_API_KEY = config.googleApiKey;

const electron = require("electron");
const storage = require("electron-storage");

const { app, BrowserWindow, Menu, ipcMain } = electron;

const MainWindow = require("./app/main_window");
const SubWindow = require("./app/sub_window");
const AuthorWindow = require("./app/autor_window");

let mainWindow;
let subWindow;
let authorWindow;

global.sharedObj = { speechLang: null };

app.on("ready", () => {
  mainWindow = new MainWindow(
    `file://${__dirname}/html/main.html`,
    process.env.NODE_ENV
  );
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createSubWindow() {
  subWindow = new SubWindow(
    `file://${__dirname}/html/sub.html`,
    process.env.NODE_ENV
  );
  subWindow.on("closed", () => (subWindow = null));
}

function createAuthorWindow() {
  authorWindow = new AuthorWindow(`file://${__dirname}/html/author.html`);
  authorWindow.on("closed", () => (authorWindow = null));
}

function saveDataToStorage(todos) {
  const obj = { todos: todos };
  const json = JSON.stringify(obj);
  storage.set("storage/todos.json", json, err => {
    if (err) {
      console.error(err);
    }
  });
}

function loadDataFromStorage() {
  storage.get("storage/todos.json", (err, obj) => {
    if (err) {
      console.error(err);
    } else {
      mainWindow.webContents.send("data:load", obj.todos);
    }
  });
}

// load data.
ipcMain.on("data:load", event => {
  loadDataFromStorage();
});

// Save data.
ipcMain.on("data:save", (event, todos) => {
  saveDataToStorage(todos);
});

// Create sub window.
ipcMain.on("sub:create", event => {
  if (!subWindow) {
    createSubWindow();
  }
});

// Add new todo.
ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  subWindow.close();
});

const menuTemplate = [
  {
    label: "Help",
    submenu: [
      {
        label: "About App",
        click() {
          if (!authorWindow) {
            createAuthorWindow();
          }
        }
      },
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

// Adjust Menu for Mac.
if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

// For Developer.
if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Develop",
    submenu: [
      { role: "reload" },
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
