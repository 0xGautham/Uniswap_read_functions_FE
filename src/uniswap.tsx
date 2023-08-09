import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const App: React.FC = () => {
    const [poolAddress, setPoolAddress] = useState<string>('');
    const [token0, setToken0] = useState<string>('');
    const [token1, setToken1] = useState<string>('');
    const [liquidity, setLiquidity] = useState<string>('');

    useEffect(() => {
        loadBlockchainData();
    }, []);

    async function loadBlockchainData() {
        const provider: any = await detectEthereumProvider();

        if (!provider) {
            console.error('MetaMask not found');
            return;
        }

        if (provider !== window.ethereum) {
            console.error('Please use MetaMask');
            return;
        }

        await provider.enable();

        const web3Provider = new ethers.BrowserProvider(provider);
        const signer = web3Provider.getSigner();

        const poolAddress = '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8'; // Replace with an actual Uniswap V3 pool address

        const pool = new ethers.Contract(
            poolAddress,
            [
                'function token0() view returns (address)',
                'function token1() view returns (address)',
                'function liquidity() view returns (uint128)'
            ],
            await signer
        );

        try {
            const token0Address = await pool.token0();
            const token1Address = await pool.token1();
            const liquidityAmount = await pool.liquidity();

            setPoolAddress(poolAddress);
            setToken0(token0Address);
            setToken1(token1Address);
            setLiquidity(liquidityAmount.toString());
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h1>Uniswap V3 Read Functions</h1>
            <p>Pool Address: {poolAddress}</p>
            <p>Token 0 Address: {token0}</p>
            <p>Token 1 Address: {token1}</p>
            <p>Liquidity: {liquidity}</p>
        </div>
    );
};

export default App;
