const successResponse = (success: boolean, message: string, data: any) => {
    return {
        success,
        message,
        ...data,
    };
}

const errorResponse = (message: string, code: number) => {
    return {
        success: false,
        code,
        message,
        data: null
    };
}

const response = (success: boolean = false, message: string, data: any, code: number) => {
    return {
        success,
        code,
        message,
        data
    };
}

export { successResponse, errorResponse, response };