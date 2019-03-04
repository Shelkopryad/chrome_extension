var request_btn = document.getElementById('request_btn');
var save_btn = document.getElementById('save_btn');
var url_cell = document.getElementById('url');
var name_cell = document.getElementById('name');
var phone_cell = document.getElementById('phone');
var email_cell = document.getElementById('email');
var message, data;
var http_req;

chrome.runtime.onMessage.addListener(function(request) {
    url_cell.innerHTML = request['url_value'];
    name_cell.innerHTML = request['name_value'];
    phone_cell.innerHTML = request['phone_value'];
    email_cell.innerHTML = request['email_value'];
});

request_btn.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id,  { code: 
            'var num = window.location.href.match(\'\\\\d+\')[0];' + 
            'http_req = new XMLHttpRequest();' + 
            'var address = \'https://pub.fsa.gov.ru/api/v1/rds/common/declarations/\' + num;' + 
            'var token = "Bearer " + window.localStorage[\'fgis_token\'];' + 
            'http_req.open("GET", address);' + 
            'http_req.setRequestHeader("Authorization", token);' + 
            'http_req.send();' + 
            'http_req.onreadystatechange = (e) => {' + 
                'if (http_req.readyState === 4) {' + 
                    'var json_response = JSON.parse(http_req.responseText);' + 
                    'var url_value = window.location.href;' +
                    'var name_value = json_response[\'applicant\'][\'shortName\'];' +
                    'var phone_value = json_response[\'applicant\'][\'contacts\'][1] ? json_response[\'applicant\'][\'contacts\'][1][\'value\'] : "не представлен";' +
                    'var email_value = json_response[\'applicant\'][\'contacts\'][0] ? json_response[\'applicant\'][\'contacts\'][0][\'value\'] : "не представлен";' +
                    'message = { \'url_value\': url_value, \'name_value\': name_value, \'phone_value\': phone_value, \'email_value\': email_value };' +
                    'chrome.runtime.sendMessage(chrome.runtime.id, message);' + 
                    'data = JSON.parse(localStorage.getItem("fgis_info")) || {};' + 
                    'data[new Date().getTime()] = message;' + 
                    'localStorage.setItem("fgis_info", JSON.stringify(data))' + 
                '};' + 
            '};'
        });
    });
};

save_btn.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { code: 
            'data = JSON.parse(localStorage.getItem("fgis_info")) || {};' + 
            'var workbook = XLSX.utils.book_new();' + 
            'var ws_name = "Sheet";' + 
            'var ws_data = [];' + 
            'for (var key in data) {' + 
                'ws_data.push(["", data[key][\'name_value\'], "", "", data[key][\'phone_value\'], data[key][\'email_value\'], "", "", data[key][\'url_value\']])' + 
            '}' + 
            'var worksheet = XLSX.utils.aoa_to_sheet(ws_data);' + 
            'XLSX.utils.book_append_sheet(workbook, worksheet, ws_name);' + 
            'XLSX.writeFile(workbook, \'out.xlsx\');' + 
            'localStorage.removeItem("fgis_info");'
        });
    });
}
