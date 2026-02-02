import app from "./app";
import logger from "./config/logger";

app.get("/healthz", async (_req, res) => {
  logger.info({ message:"Hello from /healthz"})
	return res.status(200).json({
		success: true,
		message: "Server is healthy",
	});
});

app.listen(3000, () => {
	console.log(`server is running on http://localhost:3000`);
});

export default app;
