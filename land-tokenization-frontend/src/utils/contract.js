import { ethers } from 'ethers';

// Replace with your contract ABI and address
const contractABI = [
  // ABI here
];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

let provider;
let signer;
let contract;

export const initContract = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    alert('Please install MetaMask!');
  }
};

export const getLandDetails = async (tokenId) => {
  if (contract) {
    try {
      const details = await contract.landDetails(tokenId);
      return details;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch land details.');
    }
  }
};

export const mintLandToken = async (title, location, size, tokenURI) => {
  if (contract) {
    try {
      const tx = await contract.mintLandToken(title, location, size, tokenURI);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to mint land token.');
    }
  }
};

export const verifyLandToken = async (tokenId) => {
  if (contract) {
    try {
      const tx = await contract.verifyLandToken(tokenId);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to verify land token.');
    }
  }
};