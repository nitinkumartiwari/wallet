import {execFile} from 'child_process';

function moneroServer() {
  const command = "monerod.exe";
  const child = execFile(command, ['--testnet'], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
}

function moneroService() {
  const dir = __dirname + '/walletFile';
  const command = 'monero-wallet-rpc.exe';
  const child = execFile(command, ['--disable-rpc-login', '--rpc-bind-port', '8888', '--testnet', '--wallet-dir', dir], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
}

function execCommand(cmd) {
  exec(cmd, (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  });
}

export {
  moneroServer,
  moneroService,
}
