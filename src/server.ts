import app from "./app";
import logger from "./config/logger";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

app.get("/api/v1", async (_req, res) => {
	return res.status(200).json({ success: true });
});
app.get("/api/v1/healthz", async (_req, res) => {
	logger.info({ message: "Hello from /healthz" });
	return res.status(200).json({
		success: true,
		message: "Server is healthy",
	});
});

//auth router
app.use("/api/v1/auth", authRouter);
//user router
app.use("/api/v1/user", userRouter);

app.listen(3000, () => {
	console.log(`server is running on http://localhost:3000`);
});

export default app;
