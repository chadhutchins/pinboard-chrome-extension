var curUrl = "";
var curTitle = "";
var curDescription = "";

var getUrl = false;
var getTitle = false;
var getDescription = false;

var finalUrl = "";

function setDefaults()
{
	// retrieve the current tab's url and title 
    chrome.tabs.getSelected(null, function(tab) {
        curUrl = tab.url;
		getUrl = true;
        curTitle = tab.title;
		getTitle = true;
		getDescriptionValue();
    });
}

function getDescriptionValue() 
{
    chrome.tabs.getSelected(null, function(tab) 
    {
        chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
            curDescription = response.data;
			getDescription = true;
			makeFinalUrl();
        });
    });
}

function makeFinalUrl()
{
	finalUrl = 'https://pinboard.in/add?url='+encodeURIComponent(curUrl)+'&description='+encodeURIComponent(curDescription)+'&title='+encodeURIComponent(curTitle);
	var frame = document.getElementById('pinboardsrc');
	frame.src = finalUrl;
}

setDefaults();
