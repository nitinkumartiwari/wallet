import {exec} from 'child_process';

function moneroServer() {
  const command = "monerod.exe --testnet";
  execCommand(command);
}

function moneroService() {
  const dir = __dirname + '/walletFile';
  const command = `monero-wallet-rpc.exe --rpc-bind-port 8888 --testnet --wallet-dir ${dir}`;
  execCommand(command);
}

function execCommand(cmd) {
  exec(cmd, (err, stdout, stderr) => {
    console.err(err);
    console.log(stdout);
    console.log(stderr);
  });
}

export {
  moneroServer,
  moneroService,
}
