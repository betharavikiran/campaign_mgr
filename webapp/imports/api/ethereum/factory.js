import web3 from './web3';
import CampaignFactory from './../../../contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xd251e49cdc2b31ff7adf31fbe68af20f5b2572e1'
);


export default instance;