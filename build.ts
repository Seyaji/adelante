
import appRoot from "app-root-path";
import fs from "fs";
(async function build () {
  (function copyFIles() {
    fs.mkdir(`${appRoot}/dist/files`, { recursive: true }, (error) => {
      fs.copyFile(`${appRoot}/src/files/App.css`, `./dist/files/App.css`, (error) => {
        if (error) throw error;
      });
    })
  })()
})()