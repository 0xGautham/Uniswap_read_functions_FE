// src/App.tsx
import React from 'react';
// import { ethers } from 'ethers';
import UniswapReader from './components/uniswap';
// import UniswapPosition from './components/positions';


const App: React.FC = () => {

  // const provider = new ethers.BrowserProvider(window.ethereum);
  // const contractAddress = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640';

  return (
    <div>
      <UniswapReader />
      {/* <UniswapPosition provider={provider} contractAddress={contractAddress} /> */}
    </div>
  );
};
export default App;
