// interface Iparser {
//     match: RegExp,
//     parse: Function
// }
// function doReg(regs: Iparser[], data: {name: string, value: any}) {
//     for (let i = 0; i < regs.length; i++) {
//         const { match, parse } = regs[i];
//         const { name, value } = data
//         if (name.match(match)) {
//             return parse(value)
//         }
//     }
//     return undefined;
// }
export function convert(scheme: Object, data: any) {
    const ret = {}
    for (const key in scheme) {
        if (data.hasOwnProperty(key)) {
            const d = data[key]
            const parse = scheme[key]
            if (parse) {
                ret[key] = parse(d)
            }
        }
    }
    return ret
}