const serverBuilder = require('./serverBulider');
const serverRunner  = require('./serverRunner');

const CmdCammend= process.argv;
const builderCmd = CmdCammend[2].includes('serverBuild')? CmdCammend[2].split('='):undefined;
console.log(builderCmd)

if(builderCmd[0] ==='--serverBuild' && builderCmd[1] ==='true'){
    serverBuilder();
}else{
    serverRunner();
}







