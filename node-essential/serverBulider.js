module.exports = () => {
    /**
 * stdout and stdin
 */


//to write into the terminal
process.stdout.write('writing to the terminal');

const question = [
    'what is your name',
    'what is your address',
]
const answer  =[]
const ask = (i=0) => {
  process.stdout.write(`\n\n\n ${question[i]}`)
  process.stdout.write(` > `)

}
ask(0)

//listen to  type in terminal  till we collexted all answer
process.stdin.on('data',(data) => {
    // process.stdout.write('You Write:'+data.toString().trim())
    answer.push(data.toString().trim());
    if(answer.length<question.length){
        ask(answer.length)
    }else{
        process.exit()
        //connect the server if all require question  answer by developer or exit from the procee
        // conectToServer()

    }

})
process.on('exit' , () => {
    process.stdout.write('your answer is:');
    question.forEach((eq,index) => {
        process.stdout.write( '\n' + eq+ ' : '+answer[index]);
    })
})
}

