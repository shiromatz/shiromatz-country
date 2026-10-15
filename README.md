# Country lookup

A static Vercel endpoint at `/analytics-country.json`. Its body is `{}`. Vercel's trusted edge country code is copied to the `X-Analytics-Country` response header. No application function, database, cookie, analytics SDK or external GeoIP provider is used.

Only `https://shiromatz.com` is allowed to read the header across origins. The browser sends a credential-free HEAD request with no referrer. No IP, city or coordinates are returned. Country is an IP-derived estimate, and may differ from a person's location when using a VPN or proxy.

This source and deployment are independent of TOEFL Speaking and tablega.me. Their application changes do not publish this endpoint. The proposed Vercel project name is `shiromatz-country`; its actual public URL must be verified at project creation and set in the profile site's `analytics_country_url` before release.

## Verification

Run `node --test tests/config.test.cjs`. Local checks validate configuration only. Before accepting a release, verify a real deployed HEAD request with Origin `https://shiromatz.com`, missing/disallowed origins, the exposed country header, empty body, no cookies, forged country request headers, warm-cache responses and an actual browser CORS request. Never disable Deployment Protection for a test.

Publication was explicitly approved on 2026-10-15 for the independent `shiromatz/shiromatz-country` repository and `shiromatz-country` Vercel project. Publish only after PR review and real Preview verification, then verify production. Hosting remains subject to the team's current plan and usage limits; no subscription change is included.
