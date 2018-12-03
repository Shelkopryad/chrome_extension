var request_btn = document.getElementById('request_btn');
var save_btn = document.getElementById('save_btn');
var file;
var workbook;

function handleFileSelect(evt) {
    var files = evt.target.files;
    file = files[0];
    var rABS = typeof FileReader !== "undefined" && (FileReader.prototype || {}).readAsBinaryString;
    var f = files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
        var data = evt.target.result;
        if (!rABS) data = new Uint8Array(data);
        workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
    get_file_chooser.innerHTML = file.name + " ... choose new file";
}

request_btn.onclick = function() {
    var arr = JSON.parse(localStorage.getItem("fgis_info")) || {};
    arr[new Date().getTime()] = { 1: Math.random() * 10000, 2: Math.random() * 10000, 3: Math.random() * 10000 };
    localStorage.setItem("fgis_info", JSON.stringify(arr));
}

save_btn.onclick = function () {
    var wb = XLSX.utils.book_new();
    var new_ws_name = "SheetJS";
    var ws_data = [];
    
    var arr = JSON.parse(localStorage.getItem("fgis_info")) || {};
    for (var key in arr) {
        ws_data.push([arr[key][1], "", "", arr[key][2], "", arr[key][3]])
        console.log(key + ": " + " { 1: " + arr[key][1] + ", 2: " + arr[key][2] + ", 3: " + arr[key][3] + " }")
    }

    var ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, new_ws_name);

    XLSX.writeFile(wb, 'out.xlsx');
}