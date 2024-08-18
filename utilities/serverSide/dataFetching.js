import { HEADERS } from "@/public/constants/requestHeaders";

async function getData(url, headers) {
  const requestOptions = { ...HEADERS.GET_REQUEST, ...headers };

  const resp = await fetch(process.env.NEXTAUTH_URL + url, requestOptions);
  const data = await resp.json();

  return data;
}

async function postData(url, headers) {
  const requestOptions = { ...HEADERS.POST_REQUEST, ...headers };

  const resp = await fetch(process.env.NEXTAUTH_URL + url, requestOptions);
  const data = await resp.json();

  return data;
}
module.exports = {
    getData,
    postData
}