document.addEventListener('DOMContentLoaded', function () {   
  main_run();  
});
cb = $('#clipboard');
function main_run() {
	cb = $('#clipboard');
	chrome.extension.sendMessage({tp:"cb"},function(response){
  		cb.val(response.cb.replace(/\\n/g,'\n'))
  		cb.focus();
  		cb.select();
	});
	$('#copylink').click(copythisurl);
	$('#clearcb').click(clearclipboard);
	$('#about').click(openaboutlink);
};

//处理请求
function copythisurl() {
	chrome.tabs.getSelected(null, function(tab) {
		Urlasmd='['+tab.title+']('+tab.url+')\\n';
	});
	chrome.extension.sendMessage({tp:"cp",urlmd:Urlasmd},function(response){
		cb.val(response.cb.replace(/\\n/g,'\n'))
		cb.select();
	});
}


function clearclipboard () {
	chrome.extension.sendMessage({tp:"clr",urlmd:Urlasmd},function(response){
		cb.val(response.cb.replace(/\\n/g,'\n'))
		cb.select();
	});
}
function openaboutlink () {
	window.open("https://github.com/liu946/CopyAsMd");
}