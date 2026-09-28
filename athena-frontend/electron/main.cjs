const { BrowserWindow, app,ipcMain } = require("electron");
const path = require("path");

app.whenReady().then(() => {
  const window = new BrowserWindow({
    title: "AD Contest",
    height: 500,
    width: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  window.webContents.openDevTools()

  window.on("ready-to-show", () => window.show());
  window.loadURL("http://localhost:5173/");


  ipcMain.handle('startExam',async (event,_name,urn)=>{
      const session =  await fetch('http://localhost:6001/exam/start',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({userId:urn,name:_name})
      }).then((res)=>res.json())

      console.log(session)
      return session.sessionId;
  })

  ipcMain.handle('get-mcq-number',async()=>{
    const totalMCQ = await fetch('http://localhost:6001/exam/mcq/total').then((res)=>res.json());
    console.log(totalMCQ)
    return totalMCQ.total;
  })
});
