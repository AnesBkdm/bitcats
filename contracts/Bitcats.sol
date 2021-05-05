// SPDX-License-Identifier: MIT

/**
 * @author Nes B.
 * @dev Bitcats ERC721 main contract & functions
 * @notice Developed using Truffle 5.3.2
 */
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./Ownable.sol";

contract Bitcats is IERC721, Ownable {

    uint256 public constant CREATION_LIMIT_GEN0 = 5;
    string public constant contractName = "Bitcats";
    string public constant ticker = "BITC";

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
    
    uint256 public gen0counter;
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

    modifier catMustExist(uint256 tokenId) {
        require(catExists[tokenId], "This cat doesn't exist, sorry.");
        _;
    }

    modifier onlyCatOwner(uint tokenId) {
        require(catOwnership[tokenId] == address(msg.sender), "You do not own this cat");
        _;
    }

    /**
     * Creating cats
     */
    event Birth(address _owner, uint256 _catId, uint256 _momId, uint256 _dadId, uint256 _genes);

    function _createCat(
        uint256 _momId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
        
        Cat memory _cat = Cat({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            momId: uint32(_momId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        cats.push(_cat);

        uint256 newCatId = cats.length - 1;

        catExists[newCatId] =  true;         // Updating mappings
        catOwnership[newCatId] = _owner;     // Updating mappings

        ownedTokenCount[address(0)] = 1;

        _transfer(address(0), _owner, newCatId);

        emit Birth(_owner, newCatId, _momId, _dadId, _genes);

        return newCatId;
    }

    function createCatGen0(uint256 _genes) public onlyOwner {
        require(gen0counter < CREATION_LIMIT_GEN0, "Creation limit reached");
        gen0counter++;
        _createCat(0, 0, 0, _genes, msg.sender);
    }

    function getCat(uint256 _tokenId) public view returns (
        uint256 momId_, 
        uint256 dadId_,
        uint256 birthtime_,
        uint256 generation_, 
        uint256 genes_, 
        address owner_
    ) 
    {
        Cat storage cat = cats[_tokenId];

        momId_ = cat.momId;
        dadId_ = cat.dadId;
        generation_ = cat.generation;
        birthtime_ = cat.birthTime;
        genes_ = cat.genes;
        owner_ = catOwnership[_tokenId];
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
    function name() external pure override returns (string memory tokenName) {
        return contractName;
    }

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external pure override returns (string memory tokenSymbol) {
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
    function transfer(address to, uint256 tokenId) external override noZero(to) notThisContract(to) onlyCatOwner(tokenId) {
        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
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