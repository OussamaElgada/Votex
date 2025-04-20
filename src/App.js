import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./Contract";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const voteContract = new ethers.Contract(contractAddress, contractABI, signer);

        setContract(voteContract);
        console.log("Contract connected:", voteContract);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">🗳 Blockchain Voting App</h1>
      <p className="mt-4 text-lg">
        {account ? `Wallet connected: ${account}` : "Connecting to wallet..."}
      </p>
    </div>
  );
}

export default App;
