export const messages = {
    SUCCESS: {
        OPERATION_SUCCESS: 'Operation completed successfully',
        MOVIES_FETCHED: 'Movies fetched successfully',
        FAVORITES_FETCHED: 'Favorites fetched successfully',
        ADDED_TO_FAVORITES: 'Movie is added to favorites',
        REMOVED_FROM_FAVORITES: 'Movie has been removed from favorites',
        CHECKED_IS_FAVORITE: 'Movie checked for is favorite',
    },
    ERROR: {
        INVALID_STATUS: 'Invalid status value',
        INVALID_INPUT: 'Invalid input data',
        MISSING_PARAMETERS: 'Required parameters are missing',
        INTERNAL_SERVER_ERROR: 'Something went wrong, please try again later',
        BAD_REQUEST: 'Invalid request parameters',
        NOT_FOUND: 'Resource not found',
        FORBIDDEN: 'You do not have permission to perform this action',
        CONFLICT: 'Conflict occurred, please check your request',
        ROUTE_NOT_FOUND: 'Route not found',
        READING_FILE: 'Error reading file',
        MISSING_MOVIE_INFO: 'Missing movies info',
        MISSING_IMDB_ID: 'Imdb id is missing',
        MOVIE_NOT_FOUND: 'Movie not found',
    },
    INFO: {
        PROCESSING: 'Your request is being processed',
        NO_DATA: 'No data found',
    },
} as const;