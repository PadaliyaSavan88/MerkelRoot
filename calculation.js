const crypto = require('crypto');
const addresses = ["0xe3399ccae292d3182a4bb9c3a776a7dc395c332f33e50b98f993bddab032e549", "0xe3399ccae292d3182a4bb9c3a776a7dc395c332f33e50b98f993bddab032e548"]; // Array of addresses to be whitelisted
const leaves = addresses.map(a => crypto.createHash('sha256').update(a).digest());
const tree = [];

for (let i = 0; i < leaves.length; i++) {
    tree.push(leaves[i]);
}

for (let i = 0; i < leaves.length - 1; i += 2) {
    const left = tree[i];
    const right = tree[i + 1];
    const parent = crypto.createHash('sha256').update(left).update(right).digest();
    tree.push(parent);
}

const merkleRoot = '0x' + tree[tree.length - 1].toString('hex');
console.log(merkleRoot);
