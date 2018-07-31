import wallet from './wallet';

const resolver = {
  createAccount: () => {
    return wallet.createAccount();
  },
  validateAccount: (arg) => {
    return wallet.validateAccount(arg.password);
  },
  accountDetails: async (arg) => {
    const result = await wallet.accountDetails(arg.password);
    return result;
  },
  sendMoney: (arg) => {
    return {id:"Vf"};
  }
};

export default resolver;
