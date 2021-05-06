var web3 = new Web3(Web3.givenProvider);

var instance, user, contractAddress;

contractAddress = "0x3936cefd034534d747927a462b55BC6028226f00";

$(document).ready(()=>{
    window.ehtereum.enable().then((accounts)=>{
        instance = new web3.eth.Contract(abi, contractAddress,{from:accounts[0]});
        user = accounts[0];

        console.log(instance);

        //Web3
        var str = "";
        instance.methods.createCatGen0(str).send({}, function(error, txHash){
            if(error){
                console.log(error);
            }
            else {
                console.log(txHash);
            }
        }); // Async call - No ret
    })
})