const { developmentChains } = require("../../helper-hardhat-config")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { expect } = require("chai")

// Checks if test is being run on a testnet
developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("0.02")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
              // No need for fixture as contracts are assumed to be deployed
          })

          it("allows people to fund and withdraw", async () => {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              expect(endingBalance.toString()).equal("0")
          })
      })
