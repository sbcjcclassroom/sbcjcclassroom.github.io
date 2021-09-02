const { app, BrowserWindow } = require('electron')

let win


function  createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
  //  show: false,
    closable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

   
  // and load the index.html of the app.
  let lf = win.loadFile('index.html')
 
  let isResolved = false;
  lf.then(function() {
    isResolved = true;
  })

  win.removeMenu()
  // Open the DevTools.
  //win.webContents.openDevTools()

  // Tobias added if close app before finish load it leaves a backgound proecess running
  win.webContents.on('did-finish-load', function() {
    win.closable=true
  });

  //win.once('ready-to-show', function() {
  //  console.log("ready-to-show")
  //});

  // Emitted when the window is closed.
    win.on('closed', function(e) {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.

    })

}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log("app.on win close")
  app.quit()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(function(){
    createWindow()
})


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
