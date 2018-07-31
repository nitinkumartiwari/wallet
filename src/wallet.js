import Mnemonic from 'bitcore-mnemonic';
import {createHmac} from 'crypto';
import request from './request';

class Wallet {
  craeteFileName(password) {
    const secret = 'monero';
    const fileName = createHmac('sha256', secret).update(password).digest('hex');
    return fileName;
  }
  createAccount() {
    const mnemonic = new Mnemonic();
    const password = mnemonic.toString();
    this.createWallet(password);
    return password;
  }
  validateAccount(password) {
    return Mnemonic.isValid(password);
  }
  accountDetails(password) {
    this.openWallet(password);
  }
  openWallet(password) {
    const method = 'open_wallet';
    const filename = this.craeteFileName(password);
    const params = {
      filename,
      password: filename,
    };
    request(method, params);
  }
  createWallet(password) {
    const crypto = require('crypto');
    const filename = this.craeteFileName(password);
    const method = 'create_wallet';
    const params = {
      filename,
      password: filename,
    }
    request(method, params);
  }
}

export default new Wallet();
