import Web3 from "web3";

//Create instance of Web3 that uses MetaMask provide
let web3;

//Check we are in the browser and MetaMask is running
if (typeof window !== "undefined" && window.ethereum) {
    //Browser Code
    web3 = new Web3(window.ethereum);
} else {
    //Server Code, set up our own provider using Infura
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/34feb9723d5448ed98ce1abc279d197a"
    );

    web3 = new Web3(provider);
}

export default web3;
