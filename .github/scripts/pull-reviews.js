const https = require('https')

function query() {
    return new Promise((resolve, reject) => {
        const pageSize = '100'
        const pageStart = '00'
        const url = `https://www.google.com/search?tbm=map&pb=!7i${pageSize}!8i${pageStart}!10b1!12m23!1m1!18b1!2m3!5m1!6e2!20e3!6m11!4b1!49b1!63m0!73m0!74i150000!75b1!85b1!89b1!110m0!114b1!149b1!10b1!14b1!16b1!17m1!3e1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!22m2!1sfB2uY_j0At7m5NoP8fq_0AU!7e81!24m71!1m21!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m10!3b1!4b1!5b1!6b1!13b1!14b1!15b1!17b1!21b1!22b0!2b1!5m5!2b1!3b1!5b1!6b1!7b1!10m1!8e3!11m1!3e1!14m1!3b1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!29b1!30m1!2b1!36b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m2!1b1!3b1!65m5!3m4!1m3!1m2!1i224!2i298!71b1!72m4!1m2!3b1!5b1!4b1!89b1!26m4!2m3!1i80!2i92!4i8!30m0!34m19!2b1!3b1!4b1!6b1!7b1!8m6!1b1!3b1!4b1!5b1!6b1!7b1!9b1!12b1!14b1!20b1!23b1!25b1!26b1!37m1!1e81!42b1!47m0!49m5!3b1!6m1!1b1!7m1!1e3!50m4!2e2!3m2!1b1!3b1!54m2!1e3!2sKRq8pkhuQNqnGvKnkQUYsA!67m3!7b1!10b1!14b0!69i629`
        const responseBaseObject = https.get(url, {
            headers: {
                "Referer": "https://www.google.com"
            }
        }, (response) => {
            let rawData = ''
            response.setEncoding('utf8')
            response.on('data', (chunk) => rawData += chunk)
            response.on('end', () => {
                resolve(rawData)
            })
        })

        responseBaseObject.on('error', reject)
    })
}

function prepare(input) {
    const preparedForParsing = input.substring(5).replace(/\n/g, '')
    const json = JSON.parse(preparedForParsing)
    const results = json[0][1].map(array => array[14])
    return results
}

function prepareLookup(data) {
    return function lookup(...indexes) {
        const indexesWithBrackets = indexes.reduce((acc, cur) => `${acc}[${cur}]`, '')
        const cmd = `data${indexesWithBrackets}`
        try {
            const result = eval(cmd)
            return result
        } catch(e) {
            return null
        }
    }
}

function buildResults(preparedData) {
    const results = []
    for (const place of preparedData) {
        const lookup = prepareLookup(place)
        const result = {
            address: {
                street_address: lookup(183, 1, 2),
                city: lookup(183, 1, 3),
                zip: lookup(183, 1, 4),
                state: lookup(183, 1, 5),
                country_code: lookup(183, 1, 6),
            },
            name: lookup(11),
            tags: lookup(13),
            notes: lookup(25,15,0,2),
            placeId: lookup(78),
            phone: lookup(178,0,0),
            coordinates: {
                long: lookup(208,0,2),
                lat: lookup(208,0,3)
            }
        }
        results.push(result)
    }

    return results
}

async function go() {
    const rawInput = await query()
    const preparedData = prepare(rawInput)
    const listResults = buildResults(preparedData)
    console.log(listResults)
}

go()