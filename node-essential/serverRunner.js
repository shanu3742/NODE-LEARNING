const DEFAULT_PORT = 4000;
const SERVER_CONNECTION_MESSAGE = 'Server Connected At Port Number: ';
const path = require('path');
const fs = require('fs');
const utils = require('util')
const v8 = require('v8')
const express = require('express');
const {EventEmitter} = require('events');
const { collectAnswer } = require('./lib/collectAnswer');
const app = express();



module.exports = () => {

    /**
     * 
     * global error handling midleware 
     * 
     */

    app.use((err,req,res,next) => {
     const statusCode = err.statusCode??500;
     const errorMessage = err.message??"Network Error";
     const errResponse = {
        statusCode:statusCode,
        errorMessage:errorMessage
     }

     console.log(errResponse);
     //send it to network  
     res.status(statusCode).send(errResponse)
    })
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

    //   core module of nodejs 
      
      const dirUploads = path.join(__dirname,'www','assets','image');
      console.log('created a new path using path.join',dirUploads)

     let  { TextEncoder, TextDecoder } = utils;
     let  encoder = new TextEncoder();
     let encodeText = encoder.encode('my name is shanu');
     utils.log('encoded text',encodeText);
     let decoder = new TextDecoder();
     let decodedText =decoder.decode(encodeText)
     utils.log('decoded text',decodedText)
    
     //v8

     utils.log('get heap memory statics',v8.getHeapStatistics())


   
    // rl.question('what is your name ', (answer) => {
    //   console.log('your name is : '+answer)
    // })
    const questions = [
        'What is Your Name?',
        "Where do you live?",
        "What are you going to do with nodejs"
    
    ]
   
 let  collectAnswerEmiiter =   collectAnswer(questions,(ans) => {
                                    console.log('Thankyou for answer')
                                    console.log(ans);
                                    process.exit()
                                })
      // Start the server
     collectAnswerEmiiter.on('answer',(data) => {
        console.log('type terminal answer is : '+data)
     })
      
      //event emitter concept 

    //   let event  = new EventEmitter();
    //   event.on('userTeminal',(user,location,msg) => {
    //      console.log(msg)
    //      console.log('event emited by :  ' + user);
    //      console.log('event emitted from : ' + location);
    //   })

    //   event.emit('userTeminal','shanu', 'kolkata', 'all gud')
      
    
    //   process.stdin.on('data',(data) => {
    //     event.emit('userTeminal','window', 'os', data)
    //   })

    /**
     * to get all file of directory 
     *
     *  */
    // API to read files
app.get('/api/files', (req, res, next) => {
    fs.readdir('./', (error, fileList) => {
        if (error) {
            const fileError = new Error('Something went wrong while reading the file');
            fileError.statusCode = 404;
            return next(fileError); // Pass error to middleware
        }
        res.status(200).json({ files: fileList });
    });
});
    // API to read files
    app.get('/api/files/:fileName', (req, res, next) => {
        let fileName = req.params.fileName;
        let filePath = path.join(__dirname,fileName)
        if(fs.existsSync(filePath)){
             fs.readFile(filePath,'utf-8',(err,data) => {
                if (err) {
                    const fileError = new Error('Something went wrong while reading the file');
                    fileError.statusCode = 404;
                    return next(fileError); // Pass error to middleware
                }
                res.status(200).json(data);
             })
        }else{
            const fileError = new Error('file not found');
            fileError.statusCode = 404;
            return next(fileError); // Pass error to middleware
        }
    });
    

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