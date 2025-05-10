import loadConfig from '@/config';

type RequestInit = Parameters<typeof fetch>[1] & {
  isServer?: boolean;
};

const apiClient = (
  input: URL | string,
  init?: RequestInit,
): ReturnType<typeof fetch> => {
  const url = init?.isServer ? new URL(input, loadConfig().baseUrl) : input;

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...init,
  });
};

export default apiClient;
