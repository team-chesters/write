// const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 945,
    height: 673,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // const template = [
  //   {
  //     label: 'My App',
  //     submenu: [
  //       {
  //         label: 'Toggle Menu',
  //         accelerator: shortcutKey, // Ctrl+Alt or Cmd + Alt 키를 누를 때만 시스템 메뉴 표시
  //         click: () => {
  //           const isMenuVisible = mainWindow.isMenuBarVisible();
  //           mainWindow.setMenuBarVisibility(!isMenuVisible);
  //         },
  //       },
  //       {
  //         label: 'Quit',
  //         accelerator: 'CmdOrCtrl+Q',
  //         click: () => {
  //           app.quit();
  //         },
  //       },
  //     ],
  //   },
  // ];

  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);

  // const shortcutKey = process.platform === 'darwin' ? 'Cmd+Option' : 'Ctrl+Alt';

  // Alt 키로 메뉴를 토글하기 위한 글로벌 단축키 설정
  // globalShortcut.register(shortcutKey, () => {
  //   const isMenuVisible = mainWindow.isMenuBarVisible();
  //   mainWindow.setMenuBarVisibility(!isMenuVisible);
  // });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 앱 종료 시 글로벌 단축키 등록 해제
// app.on('will-quit', () => {
//   globalShortcut.unregisterAll();
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
