import wallet from './wallet';

const resolver = {
  createAccount: () => {
    return "vfdf";
  },
  validateAccount: (password) => {
    return false;
  },
  accountDetails: (password) => {
    return {id: "fds"};
  },
  sendMoney: (password) => {
    return {id:"Vf"};
  }
};

export default resolver;
