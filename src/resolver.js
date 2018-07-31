import wallet from './wallet';

const resolver = {
  createAccount: () => {
    return wallet.createAccount();
  },
  validateAccount: (password) => {
    return wallet.validateAccount(password);
  },
  accountDetails: (password) => {
    return wallet.createAccount(password);
  },
  sendMoney: (password) => {
    return {id:"Vf"};
  }
};

export default resolver;
