// Background.js
// author : Micheal Liu
// date : 2015年02月08日
// markdown复制插件 · 右键菜单
// - 智能切换复制、粘贴
// - 累加复制（粘贴之后清空，因为存在ctrl-c原始方法）

chrome.storage.sync.set({cb:''});

chrome.contextMenus.create({
  "title": "复制本页链接为MD",
  id: 'copy-as-md-page-menu',
  "contexts": ["page", "frame"],
});

chrome.contextMenus.create({
  "title": "复制图片为MD",
  id: 'copy-as-md-image-menu',
  "contexts": ["image"],
});

chrome.contextMenus.create({
  "title": "复制链接为MD",
  id: 'copy-as-md-link-menu',
  "contexts": ["link"],
});

chrome.contextMenus.onClicked.addListener(function(itemData, tab) {
  // if (itemData.menuItemId.startsWith("copy-as-md-")) {
  //   console.log(itemData);
  //   console.log(tab);
  // }
  switch (itemData.menuItemId) {
    case 'copy-as-md-page-menu':
      appendClipBoard(`[${tab.title}](${tab.url})`);
      break;
    case 'copy-as-md-link-menu':
      chrome.tabs.executeScript(tab.id, {
        code: `
          var a_links = document.querySelectorAll('a[href="${itemData.linkUrl}"]');
          console.log(a_links);
          var title = '';
          for (var a_link of a_links) {
            if (a_link.textContent.trim().length) {
               title = a_link.textContent;
               break;
            }
          }
          chrome.extension.sendMessage("${chrome.runtime.id}", {
            type: 'append',
            data: '[' + title + '](${itemData.linkUrl})',
          });
        `
      });
      break;
    case 'copy-as-md-image-menu':
      appendClipBoard(`![图片](${itemData.srcUrl})`);
      break;
  }
});

function clearClipBoard(callback) {
  chrome.storage.sync.set({cb: ''}, function () {
    console.log('clipboard cleared.');
    if (callback)
      callback({});
  });
}

function appendClipBoard(data, callback) {
  chrome.storage.sync.get(['cb'], function(result) {
    chrome.storage.sync.set({cb: result.cb + data + '\n'}, function () {
      console.log('clipboard set to ' + result.cb + data + '\n');
      if (callback)
        callback({});
    });
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'clear') {
    clearClipBoard(sendResponse);
  } else if (request.type === 'append') {
    appendClipBoard(request.data, sendResponse);
  }
  return true;
});