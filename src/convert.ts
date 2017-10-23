interface Iopts {
    defaultParser?: ((o: any) => {}) | boolean
}
function convertObject(scheme, data: any, opts: Iopts) {
    const { defaultParser } = opts
    const ret = {}
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const d = data[key]
            const parse = scheme[key]
            if (typeof parse === "function") {
                ret[key] = parse(d)
            } else if (typeof parse === "object") {
                ret[key] = convert(parse, d, opts)
            } else if (defaultParser) {
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