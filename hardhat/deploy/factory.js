const {ethers} = require("hardhat");

const main = async() => {
    const [owner]= await ethers.getSigners();
    
    console.log(owner.address);

    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factoryInstance = await Factory.deploy("0xbfec086367C3D1199555E61C34F9753173A8D09a");
    await factoryInstance.waitForDeployment()
    const factoryAddress = await factoryInstance.getAddress();
    console.log("Factory Smart Contract deployed to:", factoryAddress);
}

main().catch((e) => {
    console.log(e);
    process.exit(1);
})