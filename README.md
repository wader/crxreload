
Reload Chrome extension automatically when files are changed.
No more Ctrl/⌘+R to reload extension.

# New method

Install [devd](https://github.com/cortesi/devd) and run `devd -l .` in the directory you want to watch for changes.

Paste this into the chrome extension source somewhere:

```javascript
(() => {
  let ws = new WebSocket('ws://127.0.0.1:8000/.devd.livereload');
  ws.onmessage = () => {
    // reload current tab with some delay
    // require permissions in manifest
    // chrome.tabs.executeScript(null, {
    //   code: 'setTimeout(function() { document.location.reload(); }, 200);'
    // });

    // reload extension
    chrome.runtime.reload();
  };
})();
```


# Old method below

## How to use

Make sure nodejs is installed.

Copy `crxreload_client.js` to your extension and add it as the first
background script in your `manifest.json` file (remember to remove it
when making a release etc).

Run `crxreload` in your extension root directory. You will see a list of
files that are watched for changes.

Manually reload the extension in Chrome and you should see a
`Extension connected` log line in the terminal.

Now save some file and you should see a `Telling extension to reload`
log line and if everything worked out fine the extension should have
been reloaded.

Optionally you can also change `crxreload_client.js` to reload the current
page. See comment a bit down in the file.

## How it works

The client does a request to a web server run by `crxreload` and the
request is not completed until some file is changed. When the requests
is completed the client triggers a reload.

The reason why you want the client script to be the first background
script is because it makes it possible to reload even when there are
some syntax error etc.

