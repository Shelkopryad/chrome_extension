let request_btn = document.getElementById('request_btn');
let status = document.getElementById('status');
var http_req;

request_btn.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id,  {code: 'var num = window.location.href.match(\'\\\\d+\')[0];http_req = new XMLHttpRequest();var address = \'https://pub.fsa.gov.ru/api/v1/rds/common/declarations/\'+num;var token = "Bearer " + window.localStorage[\'fgis_token\'];http_req.open("GET", address);http_req.setRequestHeader("Authorization", token);http_req.send();http_req.onreadystatechange = (e) => { if (http_req.readyState === 4) { var json_response = JSON.parse(http_req.responseText);console.log(json_response[\'applicant\'][\'ogrnAssignDate\']); status.innerHTML = \'Success\'; }; };' });
    });
};
