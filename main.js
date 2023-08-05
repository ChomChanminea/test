const { app, BrowserWindow, webContents } = require('electron')
const path = require('path')
    //const bcrypt = require('bcrypt')


setTimeout(() => {
    console.log('checking ready : ' + app.isReady());
}, 3000)

// bcrypt.hash('myPlaintextPassword', 10, function(err, hash) {
//     // Store hash in your password DB.
//     console.log(hash);
// });

// const isDev = process.env.NODE_ENV !== 'development';
let win, secondwin;

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            //preload: path.join(__dirname, 'preload.js')
            nodeIntegration: true
        }

    });
    // if (isDev) {
    //     win.webContents.openDevTools();
    // }
    secondwin = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            //preload: path.join(__dirname, 'preload.js')
            nodeIntegration: true,
            parent: win,
            modal: true
        }


    });
    win.loadFile('index.html');
    secondwin.loadFile('second.html')
        //win.webContents.openDevTools();
}
// app.on('before-quit', e => {
//     console.log("do you want to Quit");
//     e.preventDefault();
// })

// app.on('browser-window-blur', () => {
//     console.log("APP is unficus!");
// })

// app.on('browser-window-focus', () => {
//     console.log("APP is ficus!");
// })



app.whenReady().then(() => {
    console.log('App is ready!');
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})