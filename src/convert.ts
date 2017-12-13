interface Iopts {
    defaultParser?: ((o: any) => {}) | boolean
}
function convertObject(scheme, data: any, opts: Iopts) {
    const { defaultParser } = opts
    const ret = {}
    const all = {...scheme,...data}
    for (const key in all) {
        if (all.hasOwnProperty(key)) {
            const parse = scheme[key]
            if (typeof parse === "function") {
                ret[key] = parse(data && data[key])
            } else if (typeof parse === "object") {
                ret[key] = convert(parse, data && data[key], opts)
            } else if (defaultParser) {
                const d = data && data[key]
                ret[key] = typeof defaultParser === "function" ? defaultParser(d) : d
            }
        }
    }
    return ret
}
function convertArray(scheme, data: any, opts: Iopts) {
    const parser = scheme[0];
    const ret = []
    for (const d of data) {
        if (parser) {
            ret.push(parser(d))
        }
    }
    return ret
}

export function convert(scheme, data: any, opts: Iopts = {}) {
    return Array.isArray(data) ? convertArray(scheme, data, opts) : convertObject(scheme, data, opts)
}