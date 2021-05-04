// SPDX-License-Identifier: MIT

/**
 * @author Nes B.
 * @dev Bitcats ERC721 main contract
 * @notice Developed using Truffle 5.3.2
 */
 
pragma solidity ^0.8.0;

import "./IERC721.sol";

contract Bitcats is IERC721 {

    string public contractName = "Bitcats";
    string public ticker = "BITC";

    struct Cat {
        uint256 genes;
        uint64 birthTime;
        uint32 momId;
        uint32 dadId;
        uint16 generation;
    }

    Cat[] cats;

    mapping (address => uint256) ownedTokenCount;
    mapping (uint256 => address) public catOwnership;
    mapping (uint256 => bool) catExists;
    
    /**
     * MODIFIERS
     */
    modifier noZero(address _address) {
        require(_address != address(0), "Cannot be the zero address.");
        _;
    }

    modifier notThisContract(address _address) {
        require(_address != address(this), "Cannot be this contract address.");
        _;
    }

    modifier isOwner(uint256 tokenId) {
        require(catOwnership[tokenId] ==  msg.sender);
        _;
    }

    modifier catMustExist(uint256 tokenId) {
        require(catExists[tokenId], "This cat doesn't exist, sorry.");
        _;
    }

    /**
     * ERC721 implementation
     */

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view override returns (uint256 balance) {
        return ownedTokenCount[owner];
    }

    /**
     * @dev Returns the total number of tokens in circulation.
     */
    function totalSupply() external view override returns (uint256 total) {
        return cats.length;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() external view override returns (string memory tokenName) {
        return contractName;
    }

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view override returns (string memory tokenSymbol) {
        return ticker;
    }

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view override catMustExist(tokenId) returns (address owner) {
        return catOwnership[tokenId];
    }


     /** 
     @dev Transfers `tokenId` token from `msg.sender` to `to`.
     *
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `to` can not be the contract address.
     * - `tokenId` token must be owned by `msg.sender`.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 tokenId) external override noZero(to) notThisContract(to) isOwner(tokenId) {
        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal noZero(_from) noZero(_to) {
        ownedTokenCount[_from]--;
        ownedTokenCount[_to]++;
        catOwnership[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function _owns (address _claimant, uint256 _tokenId) internal view returns (bool) {
        if(catOwnership[_tokenId] == _claimant) {
            return true;
        } else {
            return false;
        }
    }

}