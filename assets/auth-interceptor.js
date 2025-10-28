(function (window) {
  if (!window || typeof window.fetch !== 'function') {
    return;
  }

  const originalFetch = window.fetch.bind(window);
  let accessToken = null;
  let refreshPromise = null;
  const LOGIN_REDIRECT_PATH = '/login';

  function setAccessToken(token) {
    accessToken = typeof token === 'string' && token.length > 0 ? token : null;
  }

  function getAccessToken() {
    return accessToken;
  }

  function clearAccessToken() {
    accessToken = null;
  }

  function redirectToLogin() {
    clearAccessToken();
    if (LOGIN_REDIRECT_PATH) {
      window.location.href = LOGIN_REDIRECT_PATH;
    }
  }

  async function refreshAccessToken() {
    if (!refreshPromise) {
      refreshPromise = originalFetch('/auth/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error('Refresh request failed with status ' + response.status);
          }
          const body = await response.json().catch(() => ({}));
          if (!body || typeof body.accessToken !== 'string' || !body.accessToken) {
            throw new Error('Refresh response missing accessToken');
          }
          setAccessToken(body.accessToken);
          return accessToken;
        })
        .catch((error) => {
          clearAccessToken();
          throw error;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    return refreshPromise;
  }

  async function authFetch(input, init = {}) {
    const initialInit = { ...init };
    const shouldSkipAuth = Boolean(initialInit.skipAuth);
    if ('skipAuth' in initialInit) {
      delete initialInit.skipAuth;
    }
    const headers = new Headers(input instanceof Request ? input.headers : undefined);
    const overrideHeaders = new Headers(initialInit.headers || {});
    overrideHeaders.forEach((value, key) => headers.set(key, value));

    if (!shouldSkipAuth && accessToken && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    initialInit.headers = headers;

    let response = await originalFetch(new Request(input, initialInit));

    if (response.status !== 401) {
      return response;
    }

    try {
      await refreshAccessToken();
    } catch (error) {
      redirectToLogin();
      throw error;
    }

    if (!accessToken) {
      redirectToLogin();
      return response;
    }

    const retryInit = { ...init };
    if ('skipAuth' in retryInit) {
      delete retryInit.skipAuth;
    }
    const retryHeaders = new Headers(input instanceof Request ? input.headers : undefined);
    const retryOverrideHeaders = new Headers(retryInit.headers || {});
    retryOverrideHeaders.forEach((value, key) => retryHeaders.set(key, value));
    if (!shouldSkipAuth && accessToken && !retryHeaders.has('Authorization')) {
      retryHeaders.set('Authorization', `Bearer ${accessToken}`);
    }
    retryInit.headers = retryHeaders;

    response = await originalFetch(new Request(input, retryInit));

    if (response.status === 401) {
      redirectToLogin();
    }

    return response;
  }

  function install() {
    if (window.fetch === authFetch) {
      return;
    }
    window.fetch = authFetch;
  }

  install();

  window.authInterceptor = {
    setAccessToken,
    getAccessToken,
    clearAccessToken,
    refreshAccessToken,
    install
  };
})(typeof window !== 'undefined' ? window : undefined);
