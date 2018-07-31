import Mnemonic from 'bitcore-mnemonic';
import {createHmac} from 'crypto';
import requestRPC from './request';

class Wallet {
  craeteFileName(password) {
    const secret = 'monero';
    const fileName = createHmac('sha256', secret).update(password).digest('hex');
    return fileName;
  }
  async createAccount() {
    const mnemonic = new Mnemonic();
    const password = mnemonic.toString();
    await this.createWallet(password);
    return password;
  }
  validateAccount(password) {
    return Mnemonic.isValid(password);
  }

  async accountDetails(password) {
    await this.openWallet(password);
    const address = await this.getAddress();
    await this.stopWallet();
    console.log("address", address);
    return {address};
  }

  getAddress() {
    const method = 'getaddress';
    const params = {
      account_index : 0,
    };
    requestRPC(method, params);
  }

  openWallet(password) {
    const method = 'open_wallet';
    const filename = this.craeteFileName(password);
    const params = {
      filename,
      password: filename,
    };
    requestRPC(method, params);
  }

  stopWallet() {
    const method = 'stop_wallet';
    requestRPC(method);
  }

  async createWallet(password) {
    const crypto = require('crypto');
    const filename = this.craeteFileName(password);
    const method = 'create_wallet';
    const params = {
      filename,
      password: filename,
      language: 'English',
    }
    const res = await requestRPC(method, params);
  }
}

export default new Wallet();
