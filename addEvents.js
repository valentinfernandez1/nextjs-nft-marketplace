const Moralis = require("moralis/node")
require("dotenv").config()

const contractAddresses = require("./constants/networkMapping.json")
let chainId= process.env.chainId || 31337
let moralisChainId = chainId == "31337" ? "1337" : chainId
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

const appId = process.env.NEXT_PUBLIC_APP_ID
const masterKey = process.env.masterKey
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

const main = async (){
  await Moralis.start({serverUrl, appId, masterKey})
  console.log(`Working with contract address ${contractAddress}`)

  let itemListedOptions = {
    //Moralis understands a local chain is 1337
    chainId: moralisChainId,
    sync_historical: true,
    topic: "ItemListed(address,address,uint256,uint256)",
    abi: {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "nftAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "ItemListed",
      "type": "event"
    }
  }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.log(error)
    process.exit(1)
})
