
const header = {
    "Content-Type": "application/json",
    credentials: "include",
};

const POST_REQUEST = {
    method: "POST",
    header,
};

const GET_REQUEST = {
    method: "GET",
    header,
};

export const HEADERS = {
  POST_REQUEST,
  GET_REQUEST,
};