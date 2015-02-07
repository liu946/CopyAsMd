// EventPages.js
chrome.contextMenus.create({
	"title": "复制为Markdown",
	id : '1',
	"contexts": ["page", "frame", "editable", "image", "link"],
	"onclick": function handler(info, tab) {
		if (info.mediaType=='image') {
			str='![图片]('+info.srcUrl+')';
		}else{
			str='['+tab.title+']('+tab.url+')';
		}
		if (isChrome()) {
			alert('请复制 '+str);
			copyToClipboard(str);
			window.copy("this is a test string");
		}else{
			window.clipboardData.setData('text',str);
		}
	}
});