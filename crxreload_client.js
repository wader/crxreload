// See README.md for usage. Licensed as public domain.
// mattias.wadman@gmail.com

(function() {
  var r = new XMLHttpRequest();
  // use url that wont confuse someone debugging requests
  r.open("GET", "http://localhost:8080/crxreload-request");
  r.onreadystatechange = function() {
    var readystate_complete = 4;
    // ignore if not complete and status 200 ok
    if (r.readyState != readystate_complete || r.status != 200) {
      return;
    }

    // reload current tab with some delay
    /*
    chrome.tabs.executeScript(null, {
      code: 'setTimeout(function() { document.location.reload(); }, 200);'
    });
    */

    // reload extension
    chrome.runtime.reload();
  };
  r.send();
})();
