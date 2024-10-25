const prompts = require('prompts') 
const colors = require('colors') 
var exec = require('child_process').exec;

async function main() {
  const gitWork = 'cat ~/.ssh/config-work > ~/.ssh/config && cat ~/.gitconfig-work > ~/.gitconfig && git config --get user.email';
  const gitPersonal = 'cat ~/.ssh/config-personal > ~/.ssh/config && cat ~/.gitconfig-personal > ~/.gitconfig && git config --get user.email';

  console.log()

  const response = await prompts({
    type: 'select',
    name: 'pkg',
    message: 'Selection the git config',
    choices: [
      { title: 'Work', description: 'This config is work git config', value: gitWork },
      { title: 'Personal', description: 'This config is personal git config', value: gitPersonal },
      { title: 'Other', value: '', disabled: true },
      { title: 'Close', value: 'exit', description: 'Exit to selection' },
    ],
    initial: 0
  });

  exec(response.pkg,
    function (error, stdout, stderr) {
      if (stdout === 'exit' || stderr === 'exit') {
        console.log(colors.green('Bye bye, see you later!'));
        process.exit();
      }
      if (stdout && !stderr) {
        console.log(`Git config selected: ${colors.green(stdout)}`);
      }
      if (!stdout && stderr) {
        console.log(`Git config selected: ${colors.green(stdout)}`);
      }
      if (stdout && stderr) {
        console.log(`Git config selected: ${colors.green(stdout)}`);
      }
      if (error !== null) {
        console.log(`Occurred error: ${error}`);
      }
    });

    console.log()
  }

main()