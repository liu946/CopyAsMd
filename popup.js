document.addEventListener('DOMContentLoaded', function () {
	refresh_clipboard();
	document.getElementById('copy-this-url').addEventListener('click', copyThisUrl);
	document.getElementById('clear-clipboard').addEventListener('click', clearClipboard);
	document.getElementById('open-about-link').addEventListener('click', openAboutLink);
	document.getElementById('copy-all-url').addEventListener('click', copyAllTabUrl);
	chrome.storage.onChanged.addListener(function (changes, areaName) {
		refresh_clipboard();
	});
	const copy_btn_cjs = new ClipboardJS('#copy-raw');
	const copy_btn = document.getElementById('copy-raw');
	copy_btn.addEventListener('mouseleave', clearTooltip);
	copy_btn.addEventListener('blur', clearTooltip);

	function clearTooltip(e) {
		if (e.currentTarget.hasAttribute('ori-innerHTML')){
			e.currentTarget.innerHTML = e.currentTarget.getAttribute('ori-innerHTML');
			e.currentTarget.removeAttribute('ori-innerHTML');
		}
	}

	function showTooltip(elem, msg) {
		elem.setAttribute('ori-innerHTML', elem.innerHTML);
		elem.innerHTML = msg;
	}
	copy_btn_cjs.on('success', function (e) {
		showTooltip(e.trigger, 'Copied! 😃');
	});

	// new ClipboardJS('#copy-ul', {
	// 	text: function (trigger) {
	// 		const clipboard = document.getElementById('clipboard');
	// 		return '- ' + clipboard.value//.trim().split('\n').map((x) => '- ' + x).join('\r\n');
	// 	}
	// });
	// new ClipboardJS('#copy-nl', {
	// 	text: function (trigger) {
	// 		const clipboard = document.getElementById('clipboard');
	// 		let i = 1;
	// 		return clipboard.value.trim().split('\n').map((x) => (i++) + '. ' + x).join('\r\n');
	// 	}
	// });
});

function refresh_clipboard() {
	chrome.storage.sync.get(['cb'], function(result) {
		var cb = document.getElementById('clipboard');
		cb.value = result.cb;
		cb.focus();
		cb.select();
	});
}

//处理请求
function copyThisUrl() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.extension.sendMessage({
			type: "append",
			data: `[${tab.title}](${tab.url})`,
		}, function(response) {});
	});
}

function copyAllTabUrl() {
	chrome.tabs.query({}, function(tabs) {
		const appened_content = tabs.map((tab) => `[${tab.title}](${tab.url})`).join('\n');
		chrome.extension.sendMessage({
					type: "append",
					data: appened_content,
				}, function (response) {});
	});
}

function clearClipboard () {
	chrome.extension.sendMessage({type:"clear"}, function(response){});
}

function openAboutLink () {
	window.open("https://github.com/liu946/CopyAsMd");
}