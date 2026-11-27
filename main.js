const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1320,
    height: 880,
    minWidth: 860,
    minHeight: 620,
    backgroundColor: '#191919',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: true
    }
  });

  // Включаем проверку орфографии (русский и английский)
  mainWindow.webContents.session.setSpellCheckerLanguages(['ru', 'en-US']);

  // Скрываем стандартное верхнее меню Electron
  Menu.setApplicationMenu(null);

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
