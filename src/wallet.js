import Mnemonic from 'bitcore-mnemonic';
import {createHmac} from 'crypto';
import requestRPC from './request';
import fs from 'fs';
import path from 'path';

class Wallet {
  createFileName(password) {
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

  async logIn(password) {
    const isValid = Mnemonic.isValid(password);
    if(!isValid) return false;
    const walletFile = this.createFileName(password);
    const pathOfFile = path.normalize( __dirname + '\\..') + '\\walletFile\\' + walletFile;
    return fs.existsSync(pathOfFile);
  }

  async accountDetails(password) {
    await this.openWallet(password);
    const address = await this.getAddress();
    const amount = await this.getBalance();
    const transactions = await this.getTransactions();
    const height = await this.getHeight();
    await this.saveWallet();
    await this.stopWallet();
    return {
      address,
      amount,
      transactions,
      height,
    };
  }

  async getBalance() {
    const method = 'getbalance';
    const params = {
      account_index: 0,
    };
    const response = await requestRPC(method, params);
    const balance = response.balance / Math.pow(10, 12);
    return balance + ' XMR';
  }

  async getAddress() {
    const method = 'getaddress';
    const params = {
      account_index : 0,
    };
    const response = await requestRPC(method, params);
    return response.address;
  }

  async getHeight() {
    const method = 'getheight';
    const response = await requestRPC(method);
    return response.height;
  }

  async sendMoney({address, amount, fee, password}) {
    await this.openWallet(password);
    amount = amount * Math.pow(10, 12);
    fee = amount * Math.pow(10, 12);
    const params = {
      account_index : 0,
      destinations : {
        address,
        amount,
      }
    };
    const method = 'transfer';
    const response = await requestRPC(method, params);
    amount = (response.amount / Math.pow(10, 12)) + ' XMR';
    fee = (response.fee / Math.pow(10, 12)) + ' XMR';
    await this.saveWallet();
    await this.stopWallet();
    return {
      transactionId: response.tx_hash,
      amount,
      fee,
    };
  }

  async saveWallet() {
    const method = 'store';
    await requestRPC(method);
  }

  async openWallet(password) {
    const method = 'open_wallet';
    const filename = this.createFileName(password);
    const params = {
      filename,
      password: filename,
    };
    await requestRPC(method, params);
  }

  async stopWallet() {
    const method = 'stop_wallet';
    await requestRPC(method);
  }

  async createWallet(password) {
    const crypto = require('crypto');
    const filename = this.createFileName(password);
    const method = 'create_wallet';
    const params = {
      filename,
      password: filename,
      language: 'English',
    }
    const res = await requestRPC(method, params);
  }

async getTransactions() {
  const method = 'get_transfers';
  const params = {
    in: true,
    out: true,
    pending: true,
  };

  const response = await requestRPC(method, params);
  let responseModified = [];
  if(response.in)
  responseModified = responseModified.concat(response.in);
  if(response.out)
  responseModified = responseModified.concat(response.out);
  if(response.pending)
  responseModified = responseModified.concat(response.pending);
  const transactions = [];
  responseModified.forEach((item) => {
    const transaction = {
      transactionId: item.txid,
      timestamp: item.timestamp,
      amount : (item.amount / Math.pow(10, 12)) + ' XMR',
      address: item.destinations.address,
      type: item.type,
    };
    transactions.push(transaction);
  });
  transactions.sort((a,b) => {
    return b.timestamp - a.timestamp;
  });
  return transactions;
}
}

export default new Wallet();
