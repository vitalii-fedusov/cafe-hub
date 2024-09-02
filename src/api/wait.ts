/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "https://solid-rat-production.up.railway.app";

export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  const token = localStorage.getItem('token');

  if (token) {
    options.headers = {
      "Authorization": `Bearer ${token}`,
    };
  }

  // if (data) {
  //   options.body = JSON.stringify(data);

  //   options.headers = {
  //     ...options.headers,
  //     "Content-Type": "application/json; charset=UTF-8",
  //   };

  //   if (typeof data === File) {
  //     options.headers = {
  //       ...options.headers,
  //       'Content-Type': 'multipart/form-data',
  //     };
  //   }
  // }

  if (data) {
    if (data.imageFile instanceof File) {
      const formData = new FormData();

      formData.append('imageFile', data.imageFile);
      options.body = formData;
    } else {
      options.body = JSON.stringify(data);
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json; charset=UTF-8",
      };
    }
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      if (method !== "DELETE") {
        return response.json();
      }

      return response.url;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url, "GET"),
  post: <T>(url: string, data?: any) => request<T>(url, "POST", data),
  patch: <T>(url: string, data: any) => request<T>(url, "PATCH", data),
  put: <T>(url: string, data: any) => request<T>(url, "PUT", data),
  delete: (url: string) => request(url, "DELETE"),
};
