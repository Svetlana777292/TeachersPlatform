import ErrorField from "../components/ErrorField/ErrorField.jsx";

export function getFetchErrorMessage(status) {
    const messages = {
        400: 'Bad request. Please check your input',
        401: 'Please log in to continue',
        403: 'You don\'t have permission to access this',
        404: 'Not found',
        409: 'This user already exists',
        422: 'Invalid form data',
        429: 'Too many requests. Please try again later',
        500: 'Server error. Please try again later',
        502: 'Bad gateway. Server is temporarily unavailable',
        503: 'Service unavailable. We are under maintenance',
    }

    return messages[status] || 'Something went wrong. Please try again later'
}
