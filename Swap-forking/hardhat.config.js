require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 2000,
        },
      }
    },
    ]
  },
  networks: {
hardhat: {
  forking: {
    url: "https://mainnet.infura.io/v3/afba0c6e55e04c378d1090d5beee579f",
       blockNumber: 14189520
  }
}
  },
};
