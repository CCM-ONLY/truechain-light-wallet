var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    var Web3 = require('web3'); 
	
    var web3 = new Web3();
	//web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));		// 本地私链，测试网络
    //web3.setProvider(new web3.providers.HttpProvider('https://rinkeby.infura.io/'));	// 以太坊测试链接
	web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/'));	// 以太坊正式网
	
	//console.log(web3.eth.accounts[0]);
	var address = "0xc2892D1E69e4A337fEd0adA162B2eBC7dd3444a9";
	console.log(address); 
    var balance = web3.fromWei(web3.eth.getBalance(address), 'ether');
	console.log(balance);  
 
	
    res.write('<h2>');
    res.write('当前主账户帐号为：');
    res.write('</h1>');
    res.write('<p>');
    res.write(address);
    res.write('</p>');
    res.write('<h2>');
    res.write('以太币余额为：');
    res.write('</h1>');
    res.write('<p>');
    res.write(balance.toString());
    res.write('</p>');
    res.end();
	
}).listen(3000); //监听3000端口
console.log('Server is running');