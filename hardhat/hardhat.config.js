require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from a .env file

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true, // Enable optimizer
            runs: 200      // Set the number of optimization runs
          }
        }
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.27",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    aiaTestnet: {
      url: "https://1320.rpc.thirdweb.com",
      chainId: 1320,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
