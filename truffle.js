const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic ="blame twelve upset fun rate inch pepper genuine ceiling avocado trial afraid";

module.exports = {
    networks: {
        ropsten: {
            provider: function() {
                return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/Kh28sdWPaCppYJ3dSMOE")
            },
            network_id: 3,
            gas:4712389,
        }
    }
};
