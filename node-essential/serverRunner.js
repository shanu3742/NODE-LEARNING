const DEFAULT_PORT = 4000;
const SERVER_CONNECTION_MESSAGE = 'Server Connected At Port Number: ';
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();



module.exports = () => {
    const grab = (flag) => {
        let indexAfterFlag = process.argv.indexOf(flag)+1;
        return process.argv[indexAfterFlag]
      }
      
      let packageJsonData = { config: {} };
      const cliPort = grab('--port');
      console.log('cliport',cliPort)
      
      // Read package.json if CLI port is not provided
      if (!cliPort) {
          try {
              const packageJsonPath = path.join(__dirname, 'package.json');
              const rawData = fs.readFileSync(packageJsonPath, 'utf8');
              packageJsonData = JSON.parse(rawData);
          } catch (error) {
              console.error('Error reading or parsing package.json:', error.message);
          }
      }
      
      // Determine the port
      let port = Number(cliPort) || packageJsonData?.config?.port || DEFAULT_PORT;
      if (isNaN(port) || port < 1 || port > 65535) {
          console.error('Invalid port number. Falling back to default:', DEFAULT_PORT);
          port = DEFAULT_PORT;
      }
      
      
      
      /**
       * global object in browser is window but in node it's just global 
       * 
       */
      
      global.console.log('console using global object')
      let nodeAppname = 'shnau';
      console.log(`global object don't have access to local variable ${global.nodeAppname}`)
      
      console.log('get all key of global object')
      for(let key in global){
          console.log(key)
      }
      
      
      
      /***
       * file system basic 
       */
      let  fileBaseName =   path.basename(__filename);
      console.log('file base   name:',fileBaseName);
      
      let fileDirName = path.dirname(__filename);
      console.log('file dir name',fileDirName)
      
      let fileExtensionName = path.extname(__filename);
      console.log('file extension name',fileExtensionName)
      

      
      
      // Start the server
      
      const conectToServer = () => {
          app.listen(port, (err) => {
          if (err) {
              console.error('\n Failed to start server:', err.message);
              process.exit(1);    
          }
          console.log('\n'+SERVER_CONNECTION_MESSAGE.concat(port));
      });
      }
      conectToServer()
      
      
}