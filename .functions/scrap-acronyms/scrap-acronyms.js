const axios = require('axios')
const jsdom = require('jsdom')

exports.handler = async (event, context) => {

    try {
        const { acronym } = event.queryStringParameters
        const url = `https://www.allacronyms.com/${acronym}`

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
            }
        }
        const { data } = await axios.get(url, options)

        const JSDOM = jsdom.JSDOM
        const dom = new JSDOM(data)
        let result = []
        const nodes = dom.window.document.querySelector('.terms_items')

        if (nodes !== null) {
            const row = nodes.querySelectorAll('.terms_row')
            result = [...row].map((t) => {
                return t.textContent.replace(/^\s+|\s+$/gm, '').split("\n")[1]
            })
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch (err) {
        console.error(err.toString())
        return { statusCode: 500, body: err.toString() }
    }
}
