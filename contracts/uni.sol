// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Uniswap interface contract
interface IUniswapV2Pair {
    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

contract UniswapReadFunctions {
    address public uniswapPairAddress; // Replace this with the actual Uniswap pair address

    // Set the Uniswap pair address when deploying the contract
    constructor(address _pairAddress) {
        uniswapPairAddress = _pairAddress;
    }

    // Function to get token reserves from Uniswap pair
    function getTokenReserves()
        public
        view
        returns (uint112 reserve0, uint112 reserve1)
    {
        IUniswapV2Pair uniswapPair = IUniswapV2Pair(uniswapPairAddress);
        (reserve0, reserve1, ) = uniswapPair.getReserves();
    }

    // Function to get the last block timestamp from Uniswap pair
    function getLastBlockTimestamp() public view returns (uint32) {
        IUniswapV2Pair uniswapPair = IUniswapV2Pair(uniswapPairAddress);
        (, , uint32 blockTimestampLast) = uniswapPair.getReserves();
        return blockTimestampLast;
    }
}
