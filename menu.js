chrome.contextMenus.create({
	"title": "!!!",
	"contexts": ["page", "frame", "editable", "image", "link"],
	"onclick": function handler(info, tab) {
		// go(tab);
	}
});