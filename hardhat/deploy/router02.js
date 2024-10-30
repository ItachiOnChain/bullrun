
const {ethers} = require("hardhat");

const main = async() => {
    const [owner]= await ethers.getSigners();
    
    console.log(owner.address);

    const router = await ethers.getContractFactory("UniswapV2Router02");
    const routerInstance = await router.deploy("0x209Ab9664fc8B6e222C7EeDA4b67FD317ED75835", "0x2dA1B90f290bf5eac7687087efCfAbD545523Cb7");
    await routerInstance.waitForDeployment()
    const routerAddress = await routerInstance.getAddress();
    console.log("Factory Smart Contract deployed to:", routerAddress);
}

main().catch((e) => {
    console.log(e);
    process.exit(1);
})