# SWHell
SWHell (pronounced swell) is a proof of concept showing how service workers can allow attackers to permanently comprimise web applications and exfiltrate sensitive information.

## Deployment
1. Deploy the master server `"npm run server", configure nginx to set ip header`
2. Configure the Service Worker `edit the config.json`
3. Build the Service Worker `"node ./build -p"`
4. Register the Service Worker on any domain `execute rwsh.js while swhw.js is on the web root (both files are found in the /dist folder after building)`

## In Depth

The Service Worker monitors all requests and  automatically injects a javascript payload into any request that is being made by the browser navigator for a web page. It makes the request for the real web page, injects a javascript payload into the HTML, and forges and sends back a new response.

This javascript payload communicates with the Service Worker in order to give it access to things it wouldn't normally have access to, like cookies, localStorage, and sessionStorage which is sent from the on page payload to the Service Worker.

The Service Worker sends this data to the master server which aggregates the data. Since the requests are being made by the Service Worker instead of locally on the page none of the request show up in the developer tools, hiding it's trail.

Additionally, the page payload uses the MutationObserver API to automatically detect all form elements (even elements created after page load), and attach a submit listener which steals the form's data and parses it into JSON and sends it to the master server before the page resets.

Also as a defensive measure it modifies the ServiceWorkerRegistration prototype to make it impossible to unregister the service worker.

#### Warning
This code is for educational purposes only. Please do not use this code for evil and/or illegal purposes. I take no responsibility for however you choose to use and/or modify this software (see the license for more information).
