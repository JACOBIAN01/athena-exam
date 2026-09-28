const { BrowserWindow, app } = require("electron");

app.whenReady().then(() => {
  const window = new BrowserWindow({
    title: "AD Contest",
    height: 500,
    width: 800,
    show: false,
  });

  window.on("ready-to-show", () => window.show());
  window.loadURL("http://localhost:5173/");
});
