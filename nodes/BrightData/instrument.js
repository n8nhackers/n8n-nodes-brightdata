import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://9f7d21e5e4d5d592abb07b93455763f3@o4507191300128768.ingest.us.sentry.io/4509369582288899",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
