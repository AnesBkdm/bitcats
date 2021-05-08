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

    uint256 public constant CREATION_LIMIT_GEN0 = 25;
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
    
    /**
     * Mappings
     */
    mapping (address => uint256) ownedTokenCount;
    mapping (uint256 => address) public catOwnership;
    mapping (uint256 => bool) catExists;

    mapping (uint256 => address) public catIndexApproved;
    mapping (address => mapping (address => bool)) private _operatorApprovals;
    
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
     * Additional events
     */
    event Birth(address _owner, uint256 _catId, uint256 _momId, uint256 _dadId, uint256 _genes);

    /**
     * Creating cats
     */

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
        uint256 momId, 
        uint256 dadId,
        uint256 birthtime,
        uint256 generation, 
        uint256 genes, 
        address owner
    ) 
    {
        Cat storage cat = cats[_tokenId];

        momId = cat.momId;
        dadId = cat.dadId;
        generation = cat.generation;
        birthtime = cat.birthTime;
        genes = cat.genes;
        owner = catOwnership[_tokenId];
    }


    /**
     * ERC721 implementation
     * (See IERC721 for notes)
     */

    function balanceOf(address owner) external view override returns (uint256 balance) {
        return ownedTokenCount[owner];
    }

    function totalSupply() external view override returns (uint256 total) {
        return cats.length;
    }

    function name() external pure override returns (string memory tokenName) {
        return contractName;
    }

    function symbol() external pure override returns (string memory tokenSymbol) {
        return ticker;
    }

    function ownerOf(uint256 tokenId) external view override catMustExist(tokenId) returns (address owner) {
        return catOwnership[tokenId];
    }

    function transfer(address to, uint256 tokenId) external override noZero(to) notThisContract(to) onlyCatOwner(tokenId) {
        _transfer(msg.sender, to, tokenId);
    }

    function approve(address _approved, uint256 _tokenId) override external catMustExist(_tokenId) onlyCatOwner(_tokenId) {
        _approve(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) override external{
        require (_operator != msg.sender, "You can't set yourself as approved operator.");
        _setApprovalForAll(msg.sender, _operator, _approved);
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) override external view catMustExist(_tokenId) returns (address){
        return catIndexApproved[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) override external view returns (bool){
        return _operatorApprovals[_owner][_operator];
    }


    /**
     * Internal functions
     */

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownedTokenCount[_to]++;
        catOwnership[_tokenId] = _to;

        if (_from != address(0)){
            ownedTokenCount[_from]--;
            delete catIndexApproved[_tokenId];
        }

        emit Transfer(_from, _to, _tokenId);
    }

    function _owns (address _claimant, uint256 _tokenId) internal view returns (bool) {
        if(catOwnership[_tokenId] == _claimant) {
            return true;
        } else {
            return false;
        }
    }

    function _approve(address _approved, uint256 _tokenId) internal {
        catIndexApproved[_tokenId] = _approved;
    }

    function _setApprovalForAll(address _allower, address _operator, bool _approved) internal {
        _operatorApprovals[_allower][_operator] = _approved;
    }

}