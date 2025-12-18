# GLDToken — ERC20 Utility Token (Hardhat 3 + OpenZeppelin)

Este projeto é um **token ERC20** desenvolvido com **Solidity**, utilizando os contratos auditados da **OpenZeppelin** e o **Hardhat 3** como framework de desenvolvimento, testes e deploy.

O objetivo do projeto é demonstrar:

* implementação correta de um ERC20
* uso de boas práticas
* testes automatizados
* deploy em blockchain local e testnet

---

## Visão Geral

O **GLDToken** é um token ERC20 padrão, com:

* nome: **Gold**
* símbolo: **GLD**
* 18 casas decimais
* supply inicial definido no deploy
* compatibilidade total com wallets e explorers (MetaMask, Etherscan, etc.)

O projeto serve como **base para tokens utilitários**, podendo ser estendido com:

* staking
* governança
* taxas
* burn
* mint controlado

---

## Tecnologias Utilizadas

* **Solidity** `^0.8.x`
* **OpenZeppelin Contracts**
* **Hardhat 3 (Beta)**
* **ethers.js**
* **Mocha / Chai** (testes)
* **TypeScript / JavaScript (ESM)**

---

## Estrutura do Projeto

```
.
├── contracts/
│   └── GLDToken.sol        # Contrato ERC20
├── scripts/
│   └── deploy.js           # Script de deploy
├── test/
│   └── GLDToken.ts         # Testes automatizados
├── ignition/               # (opcional) Módulos de deploy, no caso fiz o deploy com script
├── hardhat.config.ts       # Configuração do Hardhat
└── README.md
```

---

## Contrato

O token utiliza o ERC20 da OpenZeppelin:

```solidity
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

O supply inicial é criado no deploy e enviado para o deployer.

---

## Rodando os Testes

Para rodar **todos os testes**:

```bash
npx hardhat test
```

Para rodar apenas:

* testes Solidity:

  ```bash
  npx hardhat test solidity
  ```
* testes Mocha / ethers:

  ```bash
  npx hardhat test mocha
  ```

Os testes cobrem:

* metadados do token
* mint inicial
* transferências
* approve / transferFrom
* reverts esperados

---

## Blockchain Local (Simulada)

Para subir uma blockchain local (igual ao Remix “JavaScript VM”):

```bash
npx hardhat node
```

Isso cria uma rede local em `http://127.0.0.1:8545` com contas pré-carregadas.

---

## Deploy Local

Em outro terminal, após subir o node:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

O script faz:

* deploy do contrato
* log do endereço
* verificação de supply inicial

---

## Deploy em Testnet (Sepolia)

Para fazer deploy em Sepolia:

1. Configure sua chave privada:

   ```bash
   npx hardhat keystore set SEPOLIA_PRIVATE_KEY
   ```

2. Execute o deploy:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

---

## Interação Manual (Hardhat Console)

Para interagir com o contrato (igual Remix, via terminal):

```bash
npx hardhat console --network localhost
```

Exemplo:

```js
const { ethers } = await hre.network.connect()
const [deployer, alice] = await ethers.getSigners()

const token = await ethers.getContractAt("GLDToken", "ENDERECO_DO_CONTRATO")
await token.transfer(alice.address, 10n * 10n ** 18n)
```