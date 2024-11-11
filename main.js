const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const expressApp = require('./dist/index'); // Pointing to your compiled Express app
const server = expressApp.listen(3456, () => {
  console.log('Express API is running on http://localhost:3456');
});

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:3456'); // This points to the running Express server
}

ipcMain.on('print-content', (event, content, styles) => {
  const printWindow = new BrowserWindow({ show: false }); // Hidden window
  printWindow.loadURL(`data:text/html;charset=utf-8,
      <html><head>${styles}</head><body>${content}</body></html>`);

  printWindow.webContents.on('did-finish-load', () => {
      printWindow.webContents.print({}, () => {
          printWindow.close(); // Close window after printing
      });
  });
});

app.whenReady().then(() => {
   createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  server.close(); // Close the Express server when the Electron app is closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
