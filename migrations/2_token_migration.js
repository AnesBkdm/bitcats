const Token = artifacts.require("Bitcats");

module.exports = function (deployer) {
  deployer.deploy(Token);
};
