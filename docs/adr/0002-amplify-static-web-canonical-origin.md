# Amplify Hosting static WEB, canonical origin www

The Site is hosted as static files on Amplify Hosting platform **WEB** (not `WEB_COMPUTE`): Git-connected builds install with pnpm, build `@bpk/www`, and publish `www/dist/client`. No Auth, Data, storage, Nitro `aws_amplify`, or Gen 2 `defineHosting()`. The Amplify app lives in CDK `AmplifyStack` (production). The canonical origin is `https://www.brianpatrickkemper.com`; the apex hostname exists only as a 301 to that origin so SEO and bookmarks do not split across two hosts.
