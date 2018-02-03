import web3 from './web3';
import Campaign from '../../../contracts/Campaign';

console.log(Campaign);

export default address => {
    return new web3.eth.Contract(Campaign.abi, address);
};