export interface Ischeme{
    [name: string]: Function | Ischeme
}
export function convert(scheme: Ischeme, data: any) {
    for (const key in scheme) {
        
    }
    return data
}