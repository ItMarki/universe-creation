function save() {
	localStorage.setItem(btoa('universe_creation'), JSON.stringify(player, function(k, v) { return (v === Infinity) ? "Infinity" : v; }));
	get("saveButton").innerHTML = "已保存！";
	setTimeout(changeSaveButton, 5000);
}
function load() {
	let save = JSON.parse(localStorage.getItem(btoa('universe_creation')));
	cleanSave(save,getDefaultSave());
	player = save;
}
function reset() {
	if (confirm("你肯定嗎？這樣會重置全部！")) {
		player = getDefaultSave();
		save();
	}
}

function cleanSave(thing,defaultThing) {
	for(let i in defaultThing) {
		if(thing[i] === undefined) {
			thing[i] = defaultThing[i];
		}
		if(typeof thing[i] === "object") {
			cleanSave(thing[i],defaultThing[i]);
		}
		if(typeof thing[i] === "string" && thing[i][0] !== "s") {
			thing[i] = new Decimal(thing[i]);
		}
	}
}
function exp() {
	let output = get("exportOutput");
	let parent = output.parentElement;

	parent.style.display = "";
	output.value = btoa(localStorage.getItem(btoa('universe_creation')));

	output.onblur = function() {
		parent.style.display = "none";
	}
	
	output.focus()
	output.select()
	try {
		if (document.execCommand('copy')) {
			get("exportButton").innerHTML = "複製到剪貼板";
			output.blur();
			setTimeout(changeExport, 5000);
		}
	} catch(ex) {
		//rip
	}
}
function changeExport() {
	get("exportButton").innerHTML = "導出";
}
function changeSaveButton() {
	get("saveButton").innerHTML = "保存";
}
function imp() {
	var saveData = prompt("輸入你的存檔。你現在的存檔會被覆蓋！");
	saveData = atob(saveData);
	localStorage.setItem(btoa('universe_creation'), saveData);
	load();
}
setInterval(save,5000);

