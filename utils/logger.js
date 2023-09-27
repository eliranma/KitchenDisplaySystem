import winston from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
const { combine, timestamp, json } = winston.format;
const loggingWinston = new LoggingWinston({
    projectId:"avivbon",
    credentials:{
        "type":NEXT_PUBLIC_LOG_TYPE,
        "project_id": NEXT_PUBLIC_PROJECT_ID,
        "private_key_id": NEXT_PUBLIC_PRIVATE_KEY_ID,
        "private_key": NEXT_PUBLIC_PRIVATE_KEY,
        "client_email":NEXT_PUBLIC_CLIENT_EMAIL,
        "client_id": NEXT_PUBLIC_CLIENT_ID,
        "auth_uri": NEXT_PUBLIC_AUTH_URI,
        "token_uri": NEXT_PUBLIC_TOKEN_URI,
        "auth_provider_x509_cert_url": NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": NEXT_PUBLIC_CERT_URL,
        "universe_domain": NEXT_PUBLIC_UNIVERSE_DOMAIN
      }
});


const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp, json),
  transports: [new winston.transports.Console(), loggingWinston],
});

export default logger;
