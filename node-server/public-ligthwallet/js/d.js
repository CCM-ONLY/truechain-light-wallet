
/*

["0x1782730Ce1234f0A5850b750634b1970F9f4A89f","0x10592A6daD0055c586bb95474e7056F72462997A"]

["99000000000000000000","999000000000000000000"]


*/



function sendToken( ) {
	var toAddr   = ["0x1782730Ce1234f0A5850b750634b1970F9f4A89f"]  ; 		// 变量，接收地址 
	var valueToken = ["20"] ;
	distributeMultiple();
}   

// 转账代币
// 输入参数 转出帐户地址，转出代币数量，转出代币的简称（symbol）
// 调用成功，返回 tx
function distributeMultiple() {
    var contractAddr = '0x0512de7b00adc53568e255da2db2f1d497f704e4'    // ropsten -   TTR   合约地址 
	var fromAddr = '0x10592A6daD0055c586bb95474e7056F72462997A'  ;		// 基金会地址
	
	//var toAddr   = '0x1782730Ce1234f0A5850b750634b1970F9f4A89f'  ; 		// 变量，接收地址 
	//var valueToken = 2 ;												// 变量，发放的数量
	
	//var amount = parseFloat(valueToken) * 1.0e18;	 

	var gasPrice = 21000000000;
	var gas = 110000; 	 
	  
	//合约的interface
	var abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newFounder",
				"type": "address"
			}
		],
		"name": "changeFounder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "distribute",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tos",
				"type": "address[]"
			},
			{
				"name": "_values",
				"type": "uint256[]"
			}
		],
		"name": "distributeMultiple",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_endTime",
				"type": "uint256"
			}
		],
		"name": "setEndTime",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Vote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			}
		],
		"name": "voteAll",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "distributed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "founder",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "frozen",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "ticketOf",
		"outputs": [
			{
				"name": "ticket",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "supply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "totalVotes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "totalVotesOf",
		"outputs": [
			{
				"name": "totalVote",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "voteEndTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "votingInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

	

 	
	///////////////////////////////////////
	var serialized_keystore = localStorage.getItem('keystore'); 
	var keystore = lightwallet.keystore.deserialize(serialized_keystore) //将序列号的keystore转换为对象  

	var password = '12345678';
	if (password == '') {
		password = prompt('Enter password to retrieve addresses', 'Password');
	}	
	
	keystore.keyFromPassword(password, function (err, pwDerivedKey) {
		//console.log(pwDerivedKey) ;
		if(err){
			console(err) ;
		}else{
			var totalAddresses = 1;
			keystore.generateNewAddress(pwDerivedKey, totalAddresses);
			var addresses = keystore.getAddresses();
			var address = addresses[0];
			console.log(address) ; 
			privateKey = keystore.exportPrivateKey(address, pwDerivedKey);
			console.log('privateKey' +privateKey);
		}
	});
	
	//////////////////////////////////////////////////
	var web3Provider = new HookedWeb3Provider({
		//host: "http://localhost:8545", 				// 私链 
		//host: "https://rinkeby.infura.io/",		// 以太坊测试  
		host: "https://ropsten.infura.io/",			// 以太坊测试 (ropsten) 
		//host: "https://mainnet.infura.io/",					// 以太坊正式网 
		transaction_signer: {
			hasAddress: function(address, callback) {
				callback(null, true);
			},
			signTransaction: function(tx_params, callback) {
				var rawTx = {
					gasPrice: web3.toHex(tx_params.gasPrice),
					gasLimit: web3.toHex(tx_params.gas),
					value: web3.toHex(tx_params.value),
					from: tx_params.from,
					to: tx_params.to,
					nonce: web3.toHex(tx_params.nonce),
					data: web3.toHex(tx_params.data)
				};
				console.log('tx_params_data: ' + tx_params.data)

				var tx = new ethereumjs.Tx(rawTx);  
				privateKey = new ethereumjs.Buffer.Buffer(privateKey, 'hex');

				tx.sign(privateKey);
				var serializedTx = '0x' + tx.serialize().toString('hex');

				callback(null, serializedTx);
			}
		}
	});

	var web3 = new Web3(web3Provider);	  
	window.web3 = web3
	//////////////////////////////////////////////////
	
	var MyContract = web3.eth.contract(abi); 
	var myContractInstance = MyContract.at(contractAddr); 
 
	/*
	toAddr = toAddr.substring(2);
	amount = web3.fromDecimal(amount);
	amount = amount.substring(2);
	amount = PreFixInterge(amount,32);
 
	var data =  '0x' + 'fb932108' + '000000000000000000000000'+ toAddr + '00000000000000000000000000000000' + amount ;
	//data = '0xa9059cbb0000000000000000000000005833fa6053e6e781eafb8695d63d90f6b3571e5e0000000000000000000000000000000000000000000000000de0b6b3a7640000'
	*/
	
	var rawdata = myContractInstance.methods.distributeMultiple(["0xd5356FCE488804C6f48C9A057b3Cd456ecbe8190"],["1"]).encodeABI();  
 
	console.log(rawdata);
 
 
	web3.eth.sendTransaction({
		from: fromAddr,
		to: contractAddr,
		value: '0x00',
		gasPrice: gasPrice,
		gas: gas,
		data: data 
	},
	function(err, txhash) {
		console.log('error: ' + err) ;
		console.log('txhash: ' + txhash) ;

		document.getElementById('info').innerHTML += '<div>' + txhash  + '</div>'
	})	
}
 
function sendToken00( ) {
	var toAddr   = '0x1782730Ce1234f0A5850b750634b1970F9f4A89f'  ; 		// 变量，接收地址 
	var valueToken = 20 ;
	distribute(toAddr,valueToken);
}   

 
// 转账代币
// 输入参数 转出帐户地址，转出代币数量，转出代币的简称（symbol）
// 调用成功，返回 tx
function distribute(toAddr,valueToken) {
    var contractAddr = '0x0512de7b00adc53568e255da2db2f1d497f704e4'    // ropsten -   TTR   合约地址 
	var fromAddr = '0x10592A6daD0055c586bb95474e7056F72462997A'  ;		// 基金会地址
	
	//var toAddr   = '0x1782730Ce1234f0A5850b750634b1970F9f4A89f'  ; 		// 变量，接收地址 
	//var valueToken = 2 ;												// 变量，发放的数量
	
	var amount = parseFloat(valueToken) * 1.0e18;	 

	var gasPrice = 21000000000;
	var gas = 110000; 	 
	  
	//合约的interface
	var abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newFounder",
				"type": "address"
			}
		],
		"name": "changeFounder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "distribute",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tos",
				"type": "address[]"
			},
			{
				"name": "_values",
				"type": "uint256[]"
			}
		],
		"name": "distributeMultiple",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_endTime",
				"type": "uint256"
			}
		],
		"name": "setEndTime",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Vote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			}
		],
		"name": "voteAll",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "distributed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "founder",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "frozen",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "ticketOf",
		"outputs": [
			{
				"name": "ticket",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "supply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "totalVotes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "totalVotesOf",
		"outputs": [
			{
				"name": "totalVote",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "voteEndTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "votingInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

	

 	
	///////////////////////////////////////
	var serialized_keystore = localStorage.getItem('keystore'); 
	var keystore = lightwallet.keystore.deserialize(serialized_keystore) //将序列号的keystore转换为对象  

	var password = '12345678';
	if (password == '') {
		password = prompt('Enter password to retrieve addresses', 'Password');
	}	
	
	keystore.keyFromPassword(password, function (err, pwDerivedKey) {
		//console.log(pwDerivedKey) ;
		if(err){
			console(err) ;
		}else{
			var totalAddresses = 1;
			keystore.generateNewAddress(pwDerivedKey, totalAddresses);
			var addresses = keystore.getAddresses();
			var address = addresses[0];
			console.log(address) ; 
			privateKey = keystore.exportPrivateKey(address, pwDerivedKey);
			console.log('privateKey' +privateKey);
		}
	});
	
	//////////////////////////////////////////////////
	var web3Provider = new HookedWeb3Provider({
		//host: "http://localhost:8545", 				// 私链 
		//host: "https://rinkeby.infura.io/",		// 以太坊测试  
		host: "https://ropsten.infura.io/",			// 以太坊测试 (ropsten) 
		//host: "https://mainnet.infura.io/",					// 以太坊正式网 
		transaction_signer: {
			hasAddress: function(address, callback) {
				callback(null, true);
			},
			signTransaction: function(tx_params, callback) {
				var rawTx = {
					gasPrice: web3.toHex(tx_params.gasPrice),
					gasLimit: web3.toHex(tx_params.gas),
					value: web3.toHex(tx_params.value),
					from: tx_params.from,
					to: tx_params.to,
					nonce: web3.toHex(tx_params.nonce),
					data: web3.toHex(tx_params.data)
				};
				console.log('tx_params_data: ' + tx_params.data)

				var tx = new ethereumjs.Tx(rawTx);  
				privateKey = new ethereumjs.Buffer.Buffer(privateKey, 'hex');

				tx.sign(privateKey);
				var serializedTx = '0x' + tx.serialize().toString('hex');

				callback(null, serializedTx);
			}
		}
	});

	var web3 = new Web3(web3Provider);	  
	//////////////////////////////////////////////////
	
	var MyContract = web3.eth.contract(abi); 
	var myContractInstance = MyContract.at(contractAddr); 
 
 
	toAddr = toAddr.substring(2);
	amount = web3.fromDecimal(amount);
	amount = amount.substring(2);
	amount = PreFixInterge(amount,32);
 
 

	var data =  '0x' + 'fb932108' + '000000000000000000000000'+ toAddr + '00000000000000000000000000000000' + amount ;
	//data = '0xa9059cbb0000000000000000000000005833fa6053e6e781eafb8695d63d90f6b3571e5e0000000000000000000000000000000000000000000000000de0b6b3a7640000'
 
	console.log(data);
 

	web3.eth.sendTransaction({
		from: fromAddr,
		to: contractAddr,
		value: '0x00',
		gasPrice: gasPrice,
		gas: gas,
		data: data 
	},
	function(err, txhash) {
		console.log('error: ' + err) ;
		console.log('txhash: ' + txhash) ;

		document.getElementById('info').innerHTML += '<div>' + txhash  + '</div>'
	})
 
	
}

function PreFixInterge(num,n){  
  //num代表传入的数字，n代表要保留的字符的长度  
  return (Array(n).join(0)+num).slice(-n);  
}  

