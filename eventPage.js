// EventPages.js
chrome.contextMenus.create({
	"title": "复制为Markdown",
	id : '1',
	"contexts": ["page", "frame", "editable", "image", "link"],
	"onclick": function handler(info, tab) {
		// go(tab);
		alert(info);
	}
});