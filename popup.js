document.addEventListener('DOMContentLoaded', function () {   
  main_run();  
});

function main_run() {
	var cb = document.getElementById('clipboard');
	chrome.extension.sendMessage({tp:"cb"},function(response){
  		cb.innerHTML=response.cb;
	});
};