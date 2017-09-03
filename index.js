const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let subWindow;
let authorWindow;

app.on('ready', ()=> {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createSubWindow() {
  subWindow = new BrowserWindow({
    width: 300,
    height: 350
  });
  subWindow.loadURL(`file://${__dirname}/sub.html`);
  subWindow.on('closed', () => subWindow = null);
}

function createAuthorWindow() {
  authorWindow = new BrowserWindow({
    width: 200,
    height: 200
  });
  authorWindow.loadURL(`file://${__dirname}/author.html`);
  authorWindow.on('closed', () => authorWindow = null);
}

// Create sub window
ipcMain.on('sub:create', (event) => {
  createSubWindow()
});

// Add new todo
ipcMain.on('todo:add', (event, todo) => {
  mainWindow.webContents.send('todo:add', todo);
  subWindow.close();
});

const menuTemplate = [
  {
    label: 'Help',
    submenu: [
      {
        label: 'Author',
        click() { createAuthorWindow(); }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

// Adjust Menu for Mac
if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

// For Developer
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Develop',
    submenu: [
      { role: 'reload' },
      {
        label: 'Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
