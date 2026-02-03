import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./config/logger";

const app = express();

//middleware
app.disable("x-powered-by");
app.use(
	helmet({
		xPoweredBy: false,
		contentSecurityPolicy: {
			directives: {
				"script-src": ["'self'", "example.com"],
			},
		},
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	morgan("combined", {
		stream: { write: (message) => logger.info(message.trim()) },
	}),
);
app.use(
	cors({
		origin: "",
		credentials: true,
		maxAge: 3600,
		methods: ["POST", "PATCH", "GET", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
app.use(cookieParser());

export default app;
