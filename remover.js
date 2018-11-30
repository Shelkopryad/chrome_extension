var request_btn = document.getElementById('request_btn');
var save_btn = document.getElementById('save_btn');
var url_cell = document.getElementById('url');
var name_cell = document.getElementById('name');
var phone_cell = document.getElementById('phone');
var email_cell = document.getElementById('email');
var url_value, name_value, phone_value, email_value;
var http_req;
var file;

chrome.runtime.onMessage.addListener(function(request) {
    url_cell.innerHTML = request['url_value'];
    name_cell.innerHTML = request['name_value'];
    phone_cell.innerHTML = request['phone_value'];
    email_cell.innerHTML = request['email_value'];

    if (!file) {
        console.log("Alert");
        return;
    }
    console.log(file);
});

request_btn.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id,  {code: 
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
                    'chrome.runtime.sendMessage(\'oagfgjjomhalbpjephoongmhfnkocegi\', ' + 
                        '{ \'url_value\': window.location.href, \'name_value\': json_response[\'applicant\'][\'shortName\'], \'phone_value\': json_response[\'applicant\'][\'contacts\'][1][\'value\'], \'email_value\': json_response[\'applicant\'][\'contacts\'][0][\'value\'] });' + 
                '};' + 
            '};'
        });
    });
};

function handleFileSelect(evt) {
    file = evt.target.files[0];
}

document.getElementById('file_chooser').addEventListener('change', handleFileSelect, false);