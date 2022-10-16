export default interface IError {
    code: number
    httpCode: number
    key: string
    message?: string
    penalty?: boolean
    ponits?: number
}
