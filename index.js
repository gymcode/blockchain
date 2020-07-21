const sha256 = require('crypto-js/sha256')

// creating class for the block 
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index, 
        this.timestamp = timestamp, 
        this.data = data, 
        this.previousHash = previousHash, 
        this.hash = this.calculateHash()
    }

    // calculating the hash
    calculateHash(){
        return sha256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
    }
}

// defining class for the block
class BlockChain{
    constructor(){
        // creating an array to contain all the chains 
        this.chain = [this.getGenesisBlock()]
    }

    getGenesisBlock(){
        return new Block(0, '01/12/2020', 'LynxCode', "0")
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1]; 
    }

    addBlock(newBlock){
        // getting the lastest hash from the this.getLastBlock function
        newBlock.previousHash = this.getLastBlock().hash
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }

    // chain validation check
    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]; 
            const previousBlock = this.chain[i - 1];

            // checking is the current block's hash is the same as the calculates hash
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }
            // checking if the previous hash is not equal to the current hash
            if (previousBlock.hash !== currentBlock.previousHash) {
                return false
            }            
        }

        return true
    }
}


// creating an instance of a classs 
const newTrasaction = new BlockChain(); 

newTrasaction.addBlock(new Block(1, '12/05/2020', "this is a follow up block"))
newTrasaction.addBlock(new Block(2, '2/04/2020', {amount: 40})); 

console.log(JSON.stringify(newTrasaction, null, 4));

