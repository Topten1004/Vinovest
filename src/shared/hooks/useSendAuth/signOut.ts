export async function signOut<R extends boolean = true>(options?: any): Promise<R extends true ? undefined : any> {
    const { callbackUrl = window.location.href } = options ?? {};
    const baseUrl = `${window.location.origin}/api/auth`;

    const signInUrl = `${baseUrl}/${"callback"}/${"credentials"}`;
    const csrfResponse = await fetch("/api/auth/csrf");
    const { csrfToken } = await csrfResponse.json();
    const fetchOptions = {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // @ts-expect-error
        body: new URLSearchParams({
            csrfToken,
            callbackUrl,
            json: true,
        }),
    };
    const res = await fetch(`${baseUrl}/signout`, fetchOptions);
    const data = await res.json();

    // remove tokens from storage to prevent user from appearing to be signed in
    window.localStorage.removeItem("okta-cache-storage");
    window.localStorage.removeItem("okta-token-storage");

    if (options?.redirect ?? true) {
        const url = data.url ?? callbackUrl;
        window.location.href = url;
        if (url.includes("#")) window.location.reload();
        return;
    }

    return data;
}
