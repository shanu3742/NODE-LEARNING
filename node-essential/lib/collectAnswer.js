const readline = require('readline');
const {EventEmitter} = require('events');

 //basic of readline
 const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout

})
// rl.question('what is your name ', (answer) => {
//   console.log('your name is : '+answer)
// })
 


exports.collectAnswer = (questionList,done) => {
    let  emitter = new EventEmitter();
    const answer =[];
    const questionAnswer = (ans) => {
        emitter.emit('answer',ans)
       answer.push(ans);
       if(answer.length<questionList.length){
        rl.question(questionList[answer.length], questionAnswer)
       }else{
        done(answer)
       }
    }
    rl.question(questionList[0],questionAnswer)
    return emitter;
}