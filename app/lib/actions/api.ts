import axios, { AxiosRequestHeaders } from "axios";

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:4000";

export const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
const refreshSubscribers: unknown[] = [];

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
axiosClient.interceptors.request.use(
  (config: { headers: AxiosRequestHeaders }) => {
    // do something before executing the request For example tag along the bearer
    // access token to request header or set a cookie
    const accessToken = localStorage.getItem("access-token");

    if (accessToken) {
      const { headers } = config;

      config.headers = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      } as AxiosRequestHeaders;
    }

    return config;
  }
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const {
      config,
      response: { status, data },
    } = error;
    const originalRequest = config;

    if (
      status === 401 &&
      originalRequest.url !== "/login" &&
      originalRequest.url !== "/refresh-token"
    ) {
      if (!isRefreshing) {
        isRefreshing = true;

        const refresh = localStorage.getItem("refresh-token");

        axiosClient
          .post("/refresh-token", { refresh })
          .then((response) => {
            localStorage.setItem("access-token", response.data.access);

            isRefreshing = false;
            onRrefreshed(response.data.access);
          })
          .catch(() => {
            // localStorage.remove("access-token");
            // localStorage.remove("refresh-token");
          });

        const retryOriginalRequest = new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            // replace the expired token and retry
            originalRequest.headers.Authorization = "Bearer " + token;
            resolve(axios(originalRequest));
          });
        });

        return retryOriginalRequest;
      }
    } else {
      return Promise.reject(data);
    }
  }
);

const subscribeTokenRefresh = (cb: unknown) => {
  refreshSubscribers.push(cb);
};

const onRrefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};