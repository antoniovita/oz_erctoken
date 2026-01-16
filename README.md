# GLDToken — ERC20 Utility Token (Hardhat 3 + OpenZeppelin)

This project is an **ERC20 token** built with **Solidity**, using audited **OpenZeppelin** contracts and **Hardhat 3** as the development, testing, and deployment framework.

The goal of the project is to demonstrate:

* correct ERC20 implementation
* use of best practices
* automated tests
* deployment on a local blockchain and a testnet

---

## Overview

**GLDToken** is a standard ERC20 token with:

* name: **Gold**
* symbol: **GLD**
* 18 decimals
* initial supply defined at deploy
* full compatibility with wallets and explorers (MetaMask, Etherscan, etc.)

The project serves as a **base for utility tokens**, and can be extended with:

* staking
* governance
* fees
* burn
* controlled minting

---

## Technologies Used

* **Solidity** `^0.8.x`
* **OpenZeppelin Contracts**
* **Hardhat 3 (Beta)**
* **ethers.js**
* **Mocha / Chai** (testes)
* **TypeScript / JavaScript (ESM)**

---

## Project Structure

```
.
├── contracts/
│   └── GLDToken.sol        # Contrato ERC20
├── scripts/
│   └── deploy.js           # Script de deploy
├── test/
│   └── GLDToken.ts         # Testes automatizados
├── ignition/               # (optional) Deployment modules; in this case I used a script
├── hardhat.config.ts       # Configuração do Hardhat
└── README.md
```

---

## Contract

The token uses OpenZeppelin's ERC20:

```solidity
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

The initial supply is created at deploy and sent to the deployer.

---

## Running Tests

To run **all tests**:

```bash
npx hardhat test
```

To run only:

* Solidity tests:

  ```bash
  npx hardhat test solidity
  ```
* Mocha / ethers tests:

  ```bash
  npx hardhat test mocha
  ```

The tests cover:

* token metadata
* initial mint
* transfers
* approve / transferFrom
* expected reverts

---

## Local Blockchain (Simulated)

To start a local blockchain (like Remix "JavaScript VM"):

```bash
npx hardhat node
```

This creates a local network at `http://127.0.0.1:8545` with pre-funded accounts.

---

## Local Deploy

In another terminal, after starting the node:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

The script does:

* contract deployment
* address logging
* initial supply verification

---

## Testnet Deploy (Sepolia)

To deploy to Sepolia:

1. Set your private key:

   ```bash
   npx hardhat keystore set SEPOLIA_PRIVATE_KEY
   ```

2. Run the deploy:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

---

## Manual Interaction (Hardhat Console)

To interact with the contract (like Remix, via terminal):

```bash
npx hardhat console --network localhost
```

Example:

```js
const { ethers } = await hre.network.connect()
const [deployer, alice] = await ethers.getSigners()

const token = await ethers.getContractAt("GLDToken", "CONTRACT_ADDRESS")
await token.transfer(alice.address, 10n * 10n ** 18n)
```
