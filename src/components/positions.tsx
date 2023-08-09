// src/components/UniswapPosition.tsx
import React, { useState, useEffect } from 'react';
import { Contract, ethers } from 'ethers';

interface UniswapPositionProps {
    provider: ethers.BrowserProvider;
    contractAddress: string;
}

const UniswapPosition: React.FC<UniswapPositionProps> = ({ provider, contractAddress }) => {
    const [positionData, setPositionData] = useState<any>(null);

    const fetchPositionData = async () => {
        const contract = new Contract(contractAddress, ['function position(uint256 tokenId) view returns ((uint128 tickLower, uint128 tickUpper, uint256 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1))'], provider);

        const tokenId = '';

        try {
            const positionResult = await contract.position(tokenId);
            setPositionData(positionResult);
        } catch (error) {
            console.error('Error fetching position data:', error);
        }
    };

    useEffect(() => {
        fetchPositionData();
    }, []);

    return (
        <div>
            <h2>Uniswap Position Data</h2>
            {positionData ? (
                <div>
                    <p>Tick Lower: {positionData.tickLower.toString()}</p>
                    <p>Tick Upper: {positionData.tickUpper.toString()}</p>
                    <p>Liquidity: {positionData.liquidity.toString()}</p>
                </div>
            ) : (
                <p>Loading position data...</p>
            )}
        </div>
    );
};

export default UniswapPosition;
