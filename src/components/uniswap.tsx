import React, { useState } from 'react';
import { ethers } from 'ethers';
import uniswapABI from './uniswapABI.json';


const UniswapReader: React.FC = () => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [slot0Data, setSlot0Data] = useState<string | null>(null);
    const [positions, setpositions] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const connectWallet = async () => {
        try {
            const ethereum = (window as any).ethereum;
            await ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(ethereum);
            setProvider(provider);
        } catch (err) {
            setError('Error connecting to wallet.');
        }
    };

    const getSlot0Data = async () => {
        if (!provider) {
            setError('Please connect your wallet first.');
            return;
        }

        try {
            const uniswapContractAddress = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640';
            const uniswapContract = new ethers.Contract(uniswapContractAddress, uniswapABI, provider);

            const slot0 = await uniswapContract.slot0();
            setSlot0Data(slot0.toString());
        } catch (err) {
            setError('Error fetching data from Uniswap V3 contract.');
        }
    };

    const getpositions = async () => {
        if (!provider) {
            setError('Please connect your wallet first.');
            return;
        }

        try {
            const uniswapContractAddress = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640';
            const uniswapContract = new ethers.Contract(uniswapContractAddress, uniswapABI, provider);

            const positions = await uniswapContract.positions();
            setpositions(positions.toString());
        } catch (err) {
            setError('Error fetching data from Uniswap V3 contract.');
        }
    };

    return (
        <div>
            <h2>Uniswap Reader</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {provider ? (
                <div>
                    <button onClick={getSlot0Data}>Get Slot0 Data</button>
                    {slot0Data && (
                        <div>
                            <p>Slot0 Data: {slot0Data}</p>
                        </div>
                    )}

                    <button onClick={getpositions}>Get Positions Data</button>
                    {positions && (
                        <div>
                            <p>Positions: {positions}</p>
                        </div>
                    )}
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default UniswapReader;
