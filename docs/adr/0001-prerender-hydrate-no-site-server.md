# Prerender + hydrate, no Site server

The Site is expensive on Fargate, and Amplify Hosting will not run a modern request-time Node server for this stack. We prerender `/` to static HTML at build time and hydrate that document in the browser so crawlers see real markup and visitors get an interactive page. There is no Node process, server functions, `/api/*`, or Amplify Hosting compute after deploy—anything that needs a request-time server is refused in this conversion.
