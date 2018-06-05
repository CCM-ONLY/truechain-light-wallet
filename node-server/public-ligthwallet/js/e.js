
 
 
//   用私钥签名，用公钥进行验证

// 输入参数 转出帐户地址，转出代币数量，转出代币的简称（symbol）
// 调用成功，返回 tx
function sign() {
	var fromAddr = '0x10592A6daD0055c586bb95474e7056F72462997A'  ;
 
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
			console.log('privateKey: ' +privateKey);
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
					from: tx_params.from, 
				};
				console.log('tx_params_data: ' + tx_params.from);

				var tx = new ethereumjs.Tx(rawTx);  
				privateKey_buff = new ethereumjs.Buffer.Buffer(privateKey, 'hex');

				tx.sign(privateKey_buff);
				var serializedTx = '0x' + tx.serialize().toString('hex');
				
				console.log('serializedTx: ' + serializedTx);

				callback(null, serializedTx);
			}
		}
	});

	var web3 = new Web3(web3Provider);	  
	//////////////////////////////////////////////////
 
	//console.log(data);
 
 
	web3.eth.sendTransaction({
		from: fromAddr 
	},
	function(err, txhash) {
		console.log('error: ' + err) ;
		console.log('txhash: ' + txhash) ;

		document.getElementById('info').innerHTML += '<div>' + txhash  + '</div>'
	})
	
}

 

