// Background.js
// author : Micheal Liu
// date : 2015年02月08日
// markdown复制插件 · 右键菜单
// - 智能切换复制、粘贴
// - 累加复制（粘贴之后清空，因为存在ctrl-c原始方法）

// 传出函数
// 用于粘贴项目
// function grin(tag) { 
//         var myField; 
//         myField = document.activeElement;
//         myField.val(myField.val()+tag)
//         return;
//         if (document.selection) { 
//                 myField.focus(); 
//                 sel = document.selection.createRange(); 
//                 sel.text = tag; 
//                 myField.focus(); 
//         } 
//         else if (myField.selectionStart || myField.selectionStart == '0') { 
//                 var startPos = myField.selectionStart; 
//                 var endPos = myField.selectionEnd; 
//                 var cursorPos = endPos; 
//                 myField.value = myField.value.substring(0, startPos) 
//                                           + tag 
//                                           + myField.value.substring(endPos, myField.value.length); 
//                 cursorPos += tag.length; 
//                 myField.focus(); 
//                 myField.selectionStart = cursorPos; 
//                 myField.selectionEnd = cursorPos; 
//         } 
//         else { 
//                 myField.value += tag; 
//                 myField.focus(); 
//         } 
// } 
//grin('+MdClipBoard+');
//
//全局变量
var MdClipBoard='';
chrome.contextMenus.create({
	"title": "复制",
	id : '1',
	"contexts": ["page", "frame", "image", "link"],
	"onclick": function handler(info, tab) {
		var str;
		if (info.mediaType=='image') {
			str='![图片]('+info.srcUrl+')';
		}else{
			str='['+tab.title+']('+tab.url+')';
		}
		MdClipBoard+=str+'\\n';
	}
});
chrome.contextMenus.create({
	"title": "粘贴为Markdown",
	id : '2',
	"contexts": ["editable"],
	"onclick": function handler(info, tab) {
		if(tab.url.substr(0,18)=='https://trello.com'){
			chrome.tabs.executeScript({
				code:"$('.card-detail-edit textarea').val($('.card-detail-edit textarea').val()+'"+MdClipBoard+"')"
			})
			return;
		}

		chrome.tabs.executeScript({
			code: 'function grin(tag){var myField;myField=$(":focus");myField.val(myField.val()+tag);return;} grin("'+MdClipBoard+'");'
		});
		MdClipBoard='';
	}
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if(request.tp =="cb") {
      	sendResponse({cb:MdClipBoard});
    }else if(request.tp=='cp'){
    	MdClipBoard+=request.urlmd;
    	sendResponse({cb:MdClipBoard});
    }else if(request.tp=='clr'){
    	MdClipBoard='';
    	sendResponse({cb:MdClipBoard});    	
    }
});


