var file;
var oFile;
var rABS = true;

function handleFileSelect(evt) {
    file = evt.target.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onload = function (evt) {
        var data = evt.target.result;
        if (!rABS) data = new Uint8Array(data);
        var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        XLSX.utils.sheet_add_aoa(worksheet, [
            ["new data", 1, 2, 3]
        ], { origin: -1});
        /* DO SOMETHING WITH workbook HERE */
    };
    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}

document.getElementById('file_chooser').addEventListener('change', handleFileSelect, false);