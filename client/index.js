var web3 = new Web3(Web3.givenProvider);

var instance, user, contractAddress;

contractAddress = "0xF59B8a8861283267CBb1886F0d17BB961Fbb9aEF";

$(document).ready(()=>{
    window.ethereum.enable().then((accounts)=>{
        instance = new web3.eth.Contract(abi, contractAddress,{from:accounts[0]});
        user = accounts[0];

        console.log("hi");
        console.log(instance);
    })
})

/**
 * Web3 functions
 */
function createCat() {

    dna = getDna();

    instance.methods.createCatGen0(dna).send({}, function(error, txHash){
        if(error){
            console.log(error);
            alert("ERROR: Cat not created.");
        }
        else {
            console.log(txHash);
            alert("Cat with DNA " + getDna() + " created");
            getCatEventDna();
            getCatBirthEvent();
            $("#catCreation").text('txt');
        }
    });
}

function getCatEventDna() {
    instance.events.Birth().on("data", function(event) {
        console.log(event.returnValues._genes);
    }).on("error", console.error);
}

function getCatBirthEvent() {
    instance.events.Birth().on("data", function(event) {
        console.log(event);
    }).on("error", console.error);
}