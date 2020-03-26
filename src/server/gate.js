/*
https = false will always redirect to http
*/
module.exports = {
    name: 'hapi-gate-rebuild',
    version: '1.0.0',

    register: (server, options) => {
        server.ext('onRequest', function(request, h) {
            // stores original request protocol and host
            const original = {
                protocol:
                    (options.proxy !== false
                        ? request.headers['x-forwarded-proto']
                        : request.server.info.protocol) || 'http',
                host:
                    request.headers['x-forwarded-host'] || request.headers.host,
            };

            let redirect = false;
            let protocol = options.https ? 'https' : 'http';
            let host = options.www
                ? /^www\./.test(original.host)
                    ? original.host
                    : `www.${original.host}`
                : original.host.replace(/^www\./, '');
            const pathname = request.url.pathname;
            const search = request.url.search;

            // compares original with refactored values and only does a redirect if necessary
            if (protocol !== original.protocol || host !== original.host) {
                redirect = true;
            }

            if (!redirect) return h.continue;

            console.log(
                'redirect',
                `${protocol}://${host}${pathname}${search}`
            );
            return h
                .redirect(`${protocol}://${host}${pathname}${search}`)
                .takeover()
                .code(301);
        });
    },
};

/*
const Url = require('url');

module.exports = {
    name: 'hapi-gate-rebuild',
    version: '1.0.0',

    register: (server, options) => {
        server.ext('onRequest', function(request, h) {
            const redirect =
                options.proxy !== false
                    ? request.headers['x-forwarded-proto'] === 'http'
                    : request.server.info.protocol === 'http';
            const host =
                request.headers['x-forwarded-host'] || request.headers.host;

            console.log('request', request);
            if (!redirect) return h.continue;
            return h
                .redirect(
                    'https://' +
                        host +
                        request.url.pathname +
                        request.url.search
                )
                .takeover()
                .code(301);
        });
    },
};

*/
