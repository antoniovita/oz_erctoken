import { expect } from "chai";
import { network } from "hardhat";
const { ethers } = await network.connect();

describe("GLDToken", function () {
    it("Should deploy with correct name, symbol and decimals", async function () {
        const initialSupply = 1_000_000n;
        const token = await ethers.deployContract("GLDToken", [initialSupply]);
        
        expect(await token.name()).to.equal("Gold");
        expect(await token.symbol()).to.equal("GLD");
        expect(await token.decimals()).to.equal(18);
    });

    it("Should mint the initial supply to the deployer", async function () {
        const [deployer] = await ethers.getSigners();

        const initialSupply = 1_000_000n;
        const token = await ethers.deployContract("GLDToken", [initialSupply]);

        const expected = initialSupply * 10n ** 18n;

        expect(await token.totalSupply()).to.equal(expected);
        expect(await token.balanceOf(deployer.address)).to.equal(expected);
    });

    it("Should transfer tokens between accounts", async function () {
        const [deployer, account2] = await ethers.getSigners();

        const initialSupply = 1_000_000n;
        const token = await ethers.deployContract("GLDToken", [initialSupply]);

        const amount = 10n * 10n ** 18n;

        await expect(token.transfer(account2.address, amount))
        .to.emit(token, "Transfer")
        .withArgs(deployer.address, account2.address, amount);

        expect(await token.balanceOf(account2.address)).to.equal(amount);
    });


    it("Should allow transferFrom after approve", async function () {
        const [deployer, account2, account3] = await ethers.getSigners();

        const token = await ethers.deployContract("GLDToken", [1_000_000n]);

        const allowance = 50n * 10n ** 18n;
        const spend = 20n * 10n ** 18n;

        // deployer aprova account2 gastar tokens
        await expect(token.approve(account2.address, allowance))
        .to.emit(token, "Approval")
        .withArgs(deployer.address, account2.address, allowance);

        // account2 gasta do deployer e manda pra account3
        await expect(token.connect(account2).transferFrom(deployer.address, account3.address, spend))
        .to.emit(token, "Transfer")
        .withArgs(deployer.address, account3.address, spend);

        expect(await token.balanceOf(account3.address)).to.equal(spend);
        expect(await token.allowance(deployer.address, account2.address)).to.equal(allowance - spend);
    });
})