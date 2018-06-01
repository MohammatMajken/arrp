const ArrpEnvironment = require(__dirname + '/../src/ArrpEnvironment.js');
const ArrpSymbol = require(__dirname + '/../src/ArrpSymbol.js');
const ArrpEval = require(__dirname + '/../src/ArrpEvaluator.js');
const ArrpReader = require(__dirname + '/../src/ArrpReader.js');

const builtins = require(__dirname + '/../src/arrp-builtins.js');

const ar = new ArrpReader();
const ae = new ArrpEval(new ArrpEnvironment(builtins));

const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

ae.env.setGlobal(ArrpSymbol.make('exit'), () => {reader.close();process.exit();});

const prompt = 'ARRP> ';
const wait = '..... ';

reader.on('line', function(line) {
  let stackOrNull = ar.read(line);
  if (stackOrNull) {
    console.log(ae.evalFromStack(stackOrNull, true));
    reader.setPrompt(prompt, prompt.length);
  } else {
    reader.setPrompt(wait, wait.length);
  }
    reader.prompt();
});

reader.on('close', function() {
  console.log('\nBye\n');
});

reader.setPrompt(prompt, prompt.length);
reader.prompt();
