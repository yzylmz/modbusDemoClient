const { app, BrowserWindow, ipcMain } = require('electron')
var modbusClient = require('./modbusClient');


let mainWindow;

function createWindow() {
  // Tarayıcı penceresini oluştur.

  mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // DevTools'u aç.
   // mainWindow.webContents.openDevTools()
 
  setInterval(getRegisterValues, 1 * 1000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Bazı API'ler sadece bu olayın gerçekleşmesinin ardından kullanılabilir.
app.whenReady().then(createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // MacOS'de kullanıcı CMD + Q ile çıkana dek uygulamaların ve menü barlarının
  // aktif kalmaya devam etmesi normaldir.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // MacOS'de dock'a tıklandıktan sonra eğer başka pencere yoksa
  // yeni pencere açılması normaldir.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('ready', () => {
  ipcMain.on("key:newWindow", () => {

    newWindow = new BrowserWindow({
      width: 482,
      height: 300,
      webPreferences: {
        nodeIntegration: true
      }
    })

      newWindow.webContents.openDevTools();
    newWindow.setMenu(null)
    // and load the index.html of the app.
    newWindow.loadFile('modal.html')

  })

  ipcMain.on("key:saveWindow", (err,registerAddr,registerValue) => {   
    modbusClient.writeRegisters(registerAddr, registerValue);
  })
})

function getRegisterValues() { 
  var holdingRegisters = modbusClient.holdingRegisters;
  var inputRegisters = modbusClient.inputRegisters; 

  mainWindow.webContents.send("arr:inputRegisters", inputRegisters);
  mainWindow.webContents.send("arr:holdingRegisters", holdingRegisters);
}

// In this file you can include the rest of your app's specific main process
// code. Ayrıca bunları ayrı dosyalara koyabilir ve buradan isteyebilirsiniz.
