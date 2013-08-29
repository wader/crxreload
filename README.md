Reload Chrome extension automatically when files are changed.
No more switch to extensions tab and Ctrl/⌘+R.

## How to use

Make sure nodejs is installed.

Put this code snippet at the top in some extension source file while
developing:

```JavaScript
(function() {
  var r = new XMLHttpRequest();
  r.open("GET", "http://localhost:8080");
  r.onreadystatechange = function() {
    var readystate_complete = 4;
    var status_manual_page_reload = 0;
    if (r.readyState != readystate_complete ||
        r.status == status_manual_page_reload) {
      return;
    }

    // reload extension
    chrome.runtime.reload();

    // optionally reload page also (e.g. content script)
    //document.location.reload();
  };
  r.send();
})();
```

Run `crxreload` in your extension root directory:

Manually reload the extension and maybe do what ever you need to trigger
your extension to run and you should see a `Extension connected` log line.

Now edit and save some file and you should see a `Telling extension to reload`
log line. If everything worked out the extension should now be reloaded.

Depending on how your extension work you might need to manually reload some
browser page to run the extension. See comment in code above for how to
automate that also.

## How it works

The code snippet does a HTTP request to a web server run by `crxreload`.
`crxreload` hogs the request until some file change. When something changes
the requests is completed and the code snippet triggers a reload.

The reason why you want the code snippet at the top is that it makes it
possible to reload even when there are some syntax errors.

