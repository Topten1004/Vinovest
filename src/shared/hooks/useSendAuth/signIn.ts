export const signIn = async (options?: any) => {
    const { callbackUrl = window.location.href, redirect = true } = options ?? {};

    const baseUrl = `${window.location.origin}/api/auth`;


    const signInUrl = `${baseUrl}/${"callback"}/${"credentials"}`;
    const csrfResponse = await fetch("/api/auth/csrf");
    const { csrfToken } = await csrfResponse.json();

    const res = await fetch(signInUrl, {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            ...options,
            csrfToken,
            callbackUrl,
            json: true,
        }),
    });

    const data = await res.json();

    const error = new URL(data.url).searchParams.get("error");

    if (res.ok) {
        const url = data.url ?? callbackUrl;
        window.location.href = "/portfolio";
        window.location.reload();
    }

    return {
        error,
        status: res.status,
        ok: res.ok,
        url: error ? null : data.url,
    } as any;
};
