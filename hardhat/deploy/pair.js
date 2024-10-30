const { ethers } = require("hardhat");

const main = async () => {
    const [owner] = await ethers.getSigners();
    console.log("Deployer Address:", owner.address);

    // Set addresses for deployed contracts
    const factoryAddress = "0x209Ab9664fc8B6e222C7EeDA4b67FD317ED75835"; // Factory contract address
    const tokenAAddress = "0x120e86D413E248039956AA208d99F302Fa3bF05c"; // Token A address
    const tokenBAddress = "0x551b771b60BB047041563d935E3e8E43D8EF17F1"; // Token B address

    // Attach to the deployed UniswapV2Factory contract
    const factoryContract = await ethers.getContractAt("UniswapV2Factory", factoryAddress);

    // Call createPair to deploy a new pair for tokenA and tokenB
    const tx = await factoryContract.createPair(tokenAAddress, tokenBAddress);
    const receipt = await tx.wait();

    // Retrieve the pair address from the event logs
    const pairAddress = receipt.events.find(event => event.event === 'PairCreated').args.pair;
    console.log("New Pair deployed at address:", pairAddress);
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
