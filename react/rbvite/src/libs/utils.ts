export const isErrorWithMessage = (err: unknown): err is
    { message: string } => (err !== null && typeof err === 'object' && 'message' in err && typeof err.message === 'string')
    || err instanceof Error;


//type predict!