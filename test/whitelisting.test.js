const { expect } = require("chai");
const { Whitelist } = require("./Whitelist");

describe("Whitelist", function() {
  let contract;

  beforeEach(async function() {
    contract = new Whitelist();
  });

  it("should whitelist a single address", async function() {
    const address = "0x1234567890abcdef";
    await contract.whitelist(address);
    expect(await contract.isWhitelisted(address)).to.equal(true);
  });

  it("should whitelist multiple addresses", async function() {
    const addresses = ["0x1234567890abcdef", "0xabcdef1234567890"];
    await contract.whitelistBulk(addresses);
    expect(await contract.isWhitelisted(addresses[0])).to.equal(true);
    expect(await contract.isWhitelisted(addresses[1])).to.equal(true);
  });

  it("should reject an invalid proof", async function() {
    const proof = "0xdeadbeef";
    await expect(contract.whitelistWithProof(proof)).to.be.rejectedWith("Invalid proof");
  });
});
