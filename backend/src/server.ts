import { envVars } from "./app/config/env";
import { connectDB } from "./lib/db";
import { server } from "./lib/socket";

const PORT = envVars.PORT || 1126;

const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Nebula is listening on port 1126`);

      connectDB();
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

(async () => {
  await startServer();
})();
