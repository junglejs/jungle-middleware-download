# jungle-middleware-download

Download files to junglejs.

## Configuration

```
/* jungle.config.js */

const middlewareDownload = require('jungle-middleware-download');

module.exports = async () => {
    const jungleGateway = junglePreProcess({
        gateways: {
            anyGraphQLGateway
        },
        middlewareContext: {
            anyGraphQLGateway: {
                Assets: async (data) => {
                    if (!data.fileName) return;
                    const loaded = await middlewareDownload({
                        destination: 'assets',
                        url: data.url, // Source URL
                        filename: data.fileName // Used filename locally
                    });
                    data.url = url;

                    // In your .svelte file:
                    <img src={QUERYRES.assets[0].url} />
                }
            } 
        }
    });
};
```
