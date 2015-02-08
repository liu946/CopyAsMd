document.addEventListener('DOMContentLoaded', function () {   
  main_run();  
});
function main_run() {
	var cb = $('#clipboard');
	chrome.extension.sendMessage({tp:"cb"},function(response){
  		cb.val(response.cb.replace(/\\n/g,'\n'))
  		cb.select();
	});
};
