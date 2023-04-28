pragma solidity ^0.8.0;

contract Whitelist {
    bytes32 public merkleRoot;

    mapping (address => bool) public whitelist;

    function whitelistBulk(bytes32[] memory _proofs) public {
        for (uint256 i = 0; i < _proofs.length; i++) {
            require(verifyProof(_proofs[i], msg.sender), "Invalid proof");
            whitelist[msg.sender] = true;
        }
    }

    function verifyProof(bytes32 _proof, address _address) internal view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(_address));
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < 32; i++) {
            bytes1 value = _proof[i / 8] >> (i % 8);
            bytes1 mask = 0x01;
            bytes1 result = value & mask;
            if (result == 0x01) {
                computedHash = keccak256(abi.encodePacked(computedHash, merkleRoot));
            } else {
                computedHash = keccak256(abi.encodePacked(merkleRoot, computedHash));
            }
        }

        return computedHash == _proof;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external {
        merkleRoot = _merkleRoot;
    }

    function getMerkleRoot() public view returns(bytes32) {
        return merkleRoot;
    }
}
