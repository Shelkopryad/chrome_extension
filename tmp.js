var save_btn = document.getElementById('save_btn');
var get_file_chooser = document.getElementById('get_file_chooser');
var file;
var workbook;

get_file_chooser.onclick = function() {
    document.getElementById('file_chooser').click();
}

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

document.getElementById('file_chooser').addEventListener('change', handleFileSelect, false);

save_btn.onclick = function () {
    console.log(file.webkitRelativePath);

    // console.log(workbook.SheetNames[0]);
    // console.log(workbook.SheetNames[1]);
    // console.log(workbook.SheetNames[2]);

    // var worksheet = workbook.Sheets["Sheet1"];
    // console.log(worksheet);
    // var desired_cell = worksheet['A1'];
    // console.log(desired_cell.v);

    // var ws_data = [["", "Hello", "", "", "World", "", "", "", "All"]];
    // XLSX.utils.sheet_add_aoa(worksheet, ws_data, { origin: -1 });

    // console.log(worksheet);

    // // var ws = XLSX.utils.aoa_to_sheet(ws_data);;

    // console.log(worksheet);



    // // XLSX.utils.book_append_sheet(workbook, ws, "Sheet1");

    // console.log(workbook);
}