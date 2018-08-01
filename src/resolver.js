import wallet from './wallet';

const resolver = {
  createAccount: async () => {
    const result = await wallet.createAccount();
    return result;
  },
  logIn: async (args) => {
    const result = await wallet.logIn(args.password);
    return result;
  },
  accountDetails: async (args) => {
    const result = await wallet.accountDetails(args.password);
    return result;
  },
  sendMoney: async (args) => {
    const result = await wallet.sendMoney(args);
    return result
  }
};

export default resolver;
