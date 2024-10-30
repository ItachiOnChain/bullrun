const { parseEther, parseUnits, MaxUint256, getBalance, formatUnits } = require("ethers");
const { ethers } = require("hardhat");

const ERC20ABI = require('../ERC20.json');
const WETHABI = require('../WETH9.json');
const RouterABI = require("../Router02.json");
const FactoryABI = require("../UniswapV2Factory.json")
const PairABI = require("../UniswapV2Pair.json")


const main = async () => {

  const UNISWAPV2ROUTER02_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const [owner] = await ethers.getSigners();
  const provider = ethers.provider;

  const DAI = new ethers.Contract(DAI_ADDRESS, ERC20ABI, owner);
  const WETH = new ethers.Contract(WETH_ADDRESS, WETHABI, owner);
  const ROUTER = new ethers.Contract(UNISWAPV2ROUTER02_ADDRESS, RouterABI, owner);
  const FACTORY = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, owner);
  
  let pairAddress = await FACTORY.getPair(DAI_ADDRESS, WETH_ADDRESS);

  const Pair = new ethers.Contract(pairAddress, PairABI, owner);
  let DAIbalance = await DAI.balanceOf(owner.address);
  console.log("Owner DAI Balance:", DAIbalance);

  let ETHbalance = await provider.getBalance(owner.address);
  console.log("Owner ETH Balance:", ETHbalance);

  let tx = await DAI.approve(UNISWAPV2ROUTER02_ADDRESS, MaxUint256);
  await tx.wait();

  tx = await WETH.approve(UNISWAPV2ROUTER02_ADDRESS, MaxUint256);
  await tx.wait();

  const currentBlockTime = Date.now();
  const deadline = currentBlockTime - 1000000;

  console.log("====================DO-Swap======================");

  tx = await ROUTER.connect(owner).swapETHForExactTokens (
    parseEther("3000"),
    [WETH_ADDRESS, DAI_ADDRESS],
    owner.address,
    deadline,
    {
      value : parseEther("1")
    }
  );

  await tx.wait();

  DAIbalance = await DAI.balanceOf(owner.address);
  console.log("Owner DAI Balance:", DAIbalance);

  ETHbalance = await provider.getBalance(owner.address);
  console.log("Owner ETH Balance:", ETHbalance);

  let LPTokenBalance = await Pair.balanceOf(owner.address);
  console.log("Owner LP Token Balance:", LPTokenBalance);

  tx = await DAI.approve(UNISWAPV2ROUTER02_ADDRESS, MaxUint256);
  await tx.wait();

  tx = await WETH.approve(UNISWAPV2ROUTER02_ADDRESS, MaxUint256);
  await tx.wait();

  console.log("====================DO-Add-Liquidity======================");

  //add liquidity
  tx = await ROUTER.connect(owner).addLiquidityETH(
    DAI_ADDRESS,
    parseEther("3000"),
    0,
    0,
    owner.address,
    deadline,
    {
      value : parseEther("1")
    }
  );

  await tx.wait();

  DAIbalance = await DAI.balanceOf(owner.address);
  console.log("Owner DAI Balance:", DAIbalance);

  ETHbalance = await provider.getBalance(owner.address);
  console.log("Owner ETH Balance:", ETHbalance);

  LPTokenBalance = await Pair.balanceOf(owner.address);
  console.log("Owner LP Token Balance:", LPTokenBalance); 
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});

