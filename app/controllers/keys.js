export default {
    "google": {
        client_id: "341088209549-v54jnqaf3k0gvivujoeic185r6nj68rb.apps.googleusercontent.com",
        project_id: "ig-store-backend",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://www.googleapis.com/oauth2/v3/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "xNk2B_rfKorEYjRx24Q1SIp4",
        redirect_uris: ["http://localhost:8080/api/v1/auth/google/redirect"],
        javascript_origins: ["http://localhost:8080"]
    },
    "facebook": {
        clientID: '252829215423067',
        clientSecret: '53f18b396419cd68da5c55216b7ba0f8',
        callbackURL: "http://localhost:8080/api/v1/auth/facebook/redirect"
    }
}