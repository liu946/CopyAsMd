document.addEventListener('DOMContentLoaded', function () {   
  main_run();  
});
function main_run() {
	var cb = document.getElementById('clipboard');
	chrome.extension.sendMessage({tp:"cb"},function(response){
		//alert(response.cb.replace(eval('/c/gi'),'<br>'));
  		cb.innerHTML=response.cb.replace(/\\n/g,'\n');
	});
};