
export function imageURL(path: string): string {
    return `/${process.env.BASE_PATH}${path}`
}