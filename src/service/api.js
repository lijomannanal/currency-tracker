import { API_URL, API_KEY } from '../constants';
const apiHeaders = new Headers();
apiHeaders.append("apikey", API_KEY);

async function request(
  url,
  config = { headers: apiHeaders },
) {
  try {
   const response = await fetch(`${API_URL}${url}`, config);
    if (response.ok) {
        const result = await response.json();
        if (result.success) {
            return result;
        } else {
            throw new Error(result.error?.info)
        }

    } else {
        const error = await response.json();
        throw new Error(error?.message);
    }
  } catch (error) {
    throw new Error(error);
  }
}

const api =   {
  get: (url) => request(url),
};

export default api;