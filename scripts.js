const Web3 = require('web3');
const contractABI = require('./NodeOperator.json'); // Load your contract's ABI
const contractAddress = '0x9ff2bFEd68F33bf951ccdb740EAA5328666FBF3e'; // Replace 
async function main(){
    const web3 = new Web3('YOUR_KLAYTN_NODE_URL');

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    await contract.methods.deposit()
}