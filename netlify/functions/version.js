const packageJson = require('../../package.json')

exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({
          version: packageJson.version
        })
    }
}