export const HTTP_STATUS_MESSAGE = {
  ERROR: "error",
  SUCCESS: "success",
};

export const HTTP_STATUS = {
  OK: {
    code: 200,
    text: "OK",
    message: "Success",
  },
  CREATED: {
    code: 201,
    text: "CREATED",
    message: "Resource created successfully",
  },
  ACCEPTED: {
    code: 202,
    text: "ACCEPTED",
    message: "Accepted",
  },
  NO_CONTENT: {
    code: 204,
    text: "NO_CONTENT",
    message: "No content",
  },
  MOVED_PERMANENTLY: {
    code: 301,
    text: "MOVED_PERMANENTLY",
    message: "Moved permanently",
  },
  FOUND: {
    code: 302,
    text: "FOUND",
    message: "Found",
  },
  BAD_REQUEST: {
    code: 400,
    text: "BAD_REQUEST",
    message: "Bad Request",
  },
  UN_AUTHORIZED: {
    code: 401,
    text: "UN_AUTHORIZED",
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    text: "FORBIDDEN",
    message: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    text: "NOT_FOUND",
    message: "Resource not found",
  },
  NOT_ACCEPTABLE: {
    code: 404,
    text: "NOT_ACCEPTABLE",
    message: "Not acceptable",
  },
  REQUEST_TIMEOUT: {
    code: 408,
    text: "REQUEST_TIMEOUT",
    message: "Request timed out",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    text: "INTERNAL_SERVER_ERROR",
    message: "Internal Server Error",
  },
  BAD_GATEWAY: {
    code: 502,
    text: "BAD_GATEWAY",
    message: "Bad gateway",
  },
  SERVER_UNAVAILABLE: {
    code: 503,
    text: "SERVER_UNAVAILABLE",
    message: "Server is unavailable",
  },
};
