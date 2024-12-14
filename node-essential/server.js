const serverBuilder = require('./serverBulider');
const serverRunner  = require('./serverRunner');

const CmdCammend= process.argv;
const builderCmd = CmdCammend[2].includes('serverBuild')? CmdCammend[2].split('='):undefined;

const waitTime = 3000;
process.stdout.write('Wailt for System to Run');

const timeFinished =  () => {
    process.stdout.write('\nRuning Your App')
    clearInterval(intervalSub)
    app()
}

setTimeout(timeFinished, waitTime);
const waitInterval =500;
let currentTime = 0;

const incTime = () => {
    currentTime += waitInterval;
    let percentage = Math.floor((currentTime/waitTime)*100);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`system restart ${percentage}%`)

}
let intervalSub =setInterval(incTime,waitInterval)
const app = () => {
    if(builderCmd[0] ==='--serverBuild' && builderCmd[1] ==='true'){
        serverBuilder();
    }else{
        serverRunner();
    }
}







