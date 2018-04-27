
// 用keystore方式来 还原
function setWeb3Provider(){
	///////////////////////////////////////
	var serialized_keystore = localStorage.getItem('keystore'); 
	var keystore = lightwallet.keystore.deserialize(serialized_keystore) //将序列号的keystore转换为对象  
	
	var web3Provider = new HookedWeb3Provider({
		//host: "http://localhost:8545", 				// 私链 
		//host: "https://rinkeby.infura.io/",		// 以太坊测试  
		host: "https://ropsten.infura.io/",
		// 以太坊测试 (ropsten)
		//host: "https://mainnet.infura.io/",					// 以太坊正式网
		transaction_signer: keystore
	});

	web3.setProvider(web3Provider);
	//////////////////////////////////////////////////
}

// 用私钥方式 还原
function setWeb3(){
	///////////////////////////////////////
	var web3Provider = new HookedWeb3Provider({
		//host: "http://localhost:8545", 				// 私链 
		//host: "https://rinkeby.infura.io/",		// 以太坊测试  
		host: "https://ropsten.infura.io/",
		// 以太坊测试 (ropsten)
		//host: "https://mainnet.infura.io/",					// 以太坊正式网
		//transaction_signer: keystore
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
				var privateKey = '9549d6b8a48e136e27d317feae7a50a180fe2f7757d0e5fd0d9e2c6e94fa53ab';
				//var privateKey =  'c586c9e6cce80a98e3727b5296e193acb5204dac0123e2a1ed62a3b63962ea70';     //imtoken
				privateKey = new ethereumjs.Buffer.Buffer(privateKey, 'hex');

				tx.sign(privateKey);
				var serializedTx = '0x' + tx.serialize().toString('hex');

				callback(null, serializedTx);
			}
		}
	});

	web3.setProvider(web3Provider);	
	//////////////////////////////////////////////////
}
 

// 根据当前帐户地址 和 合约地址，查询代表名称、余额
function addToken() { 

	var fromAddr = '0x10592A6daD0055c586bb95474e7056F72462997A'
	//var fromAddr = '0xc2892D1E69e4A337fEd0adA162B2eBC7dd3444a9'			//钱包地址(imtoken)
	var contractAddr = '0x84b8b3370edddbace3ddbd85165ffc97e4549db7' // ropsten - HONG 
	//var contractAddr = '0xc5bba8db386b2d503ceb6521168c8a03d14b7597'    // localhost 
	//var contractAddr = '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab'    // TRUE

	var abi = [{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [{
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [{
			"name": "supply",
			"type": "uint256"
		}],
		"payable": false,
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
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
		}],
		"name": "transferFrom",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [{
			"name": "",
			"type": "uint256"
		}],
		"payable": false,
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [{
			"name": "_owner",
			"type": "address"
		}],
		"name": "balanceOf",
		"outputs": [{
			"name": "balance",
			"type": "uint256"
		}],
		"payable": false,
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [{
			"name": "",
			"type": "string"
		}],
		"payable": false,
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"name": "_to",
			"type": "address"
		},
		{
			"name": "_value",
			"type": "uint256"
		}],
		"name": "transfer",
		"outputs": [{
			"name": "success",
			"type": "bool"
		}],
		"payable": false,
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [{
			"name": "_owner",
			"type": "address"
		},
		{
			"name": "_spender",
			"type": "address"
		}],
		"name": "allowance",
		"outputs": [{
			"name": "remaining",
			"type": "uint256"
		}],
		"payable": false,
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [{
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
		}],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [{
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
		}],
		"name": "Approval",
		"type": "event"
	}]

	setWeb3Provider()
	
	var contract = web3.eth.contract(abi).at(contractAddr)

	name = contract.name() // 代币全称
	symbol = contract.symbol() // 代币简称
	decimals = contract.decimals() //小数点位数
	balances = contract.balanceOf(fromAddr) //查地址的余额
	document.getElementById('info').innerHTML += '<div>' + ' (Bal: ' + (balances / 1.0e18) + ')' + symbol + '</div>'
}
 
 
// 转账代币
// 输入参数 转出帐户地址，转出代币数量，转出代币的简称（symbol）
// 调用成功，返回 tx
function sendToken() {
	var fromAddr = '0x10592A6daD0055c586bb95474e7056F72462997A'  ;
	var toAddr   = 'Ox5833fa6053e6e781eafb8695d63d90f6b3571e5e'  ; 
	
	var valueToken = 2
	var amount = parseFloat(valueToken) * 1.0e18	 

	var gasPrice = 18000000000
	var gas = 50000 	 
	  
	//合约的interface
	var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
  
    var contractAddr = '0x84b8b3370edddbace3ddbd85165ffc97e4549db7'    // ropsten - HONG   
 	
	///////////////////////////////////////
	var serialized_keystore = localStorage.getItem('keystore'); 
	var keystore = lightwallet.keystore.deserialize(serialized_keystore) //将序列号的keystore转换为对象  

	var password = '';
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
 
	var data =  '0x' + 'a9059cbb' + '000000000000000000000000'+ toAddr + '00000000000000000000000000000000' + amount ;
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

