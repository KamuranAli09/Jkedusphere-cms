# JKEdusphere CMS (Cloudflare Workers + D1) - Stage 1

Database + secure admin login. Free on Cloudflare.

## Deploy (all free)

1. **GitHub:** create a private repo `jkedusphere-cms` and upload all files (`package.json`, `wrangler.toml`, `src/`, `migrations/`).
2. **Create the database:** Cloudflare dashboard -> Storage & Databases -> D1 -> Create database, name it `jkedusphere`. Copy its **Database ID**.
3. **Edit `wrangler.toml` on GitHub:** replace `PASTE-YOUR-D1-DATABASE-ID-HERE` with that ID and commit.
4. **Create the tables:** open the D1 database -> Console, paste the full contents of `migrations/0001_init.sql`, and run it.
5. **Deploy:** Workers & Pages -> Create -> Import a repository -> pick `jkedusphere-cms`. Leave the build command empty; deploy command `npx wrangler deploy`.
6. **Set the setup key:** Worker -> Settings -> Variables and Secrets -> add a **Secret** named `SETUP_KEY` with a long random value.
7. **Create your admin:** open `https://<your-worker>.workers.dev/admin/setup`, enter the setup key, your email, and a password of 12+ characters.
8. **Lock setup:** afterwards delete the `SETUP_KEY` secret. Setup also refuses to run once a user exists.

Log in at `/admin/login`.

## Security built in
- PBKDF2-SHA256 password hashing with a unique salt per user
- Session tokens stored hashed; HttpOnly, Secure, SameSite=Strict cookies
- Login lockout: 5 failed attempts per IP, then a 15-minute block
- Cross-site POST blocking, CSP, no-framing and no-cache headers on /admin
- /admin excluded from search engines
