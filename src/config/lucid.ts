function run_checks() {
  // This function is a placeholder for any checks that need to be run
  // before the configuration is loaded.
  console.log("Running pre-load checks...");

  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode. Pre-load checks are enabled.");
  }

  if (!process.env.BLOCKFROST_API_KEY) {
    throw new Error("Error: BLOCKFROST_API_KEY environment variable is not set.");
  }
}

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;
const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY || "";

export {
  run_checks,
  NODE_ENV,
  PORT,
  BLOCKFROST_API_KEY
}