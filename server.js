require("dotenv").config();

const express = require("express");
const axios = require("axios");
const { Log, getToken } = require("./middleware/logger");
const selectVehicles = require("./service/scheduler");

const app = express();
app.use(express.json());

/**
 * Root test
 */
app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Root route accessed");
  res.send("Server running 🚀");
});

/**
 * MAIN API (THIS IS EVALUATED)
 */
app.get("/schedule", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Schedule API called");

    const token = await getToken();

    // Fetch depots
    await Log("backend", "info", "service", "Fetching depots");

    const depotsRes = await axios.get(
      "http://20.207.122.201/evaluation-service/depots",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Fetch vehicles
    await Log("backend", "info", "service", "Fetching vehicles");

    const vehiclesRes = await axios.get(
      "http://20.207.122.201/evaluation-service/vehicles",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;

    let result = [];

    for (let depot of depots) {
      await Log("backend", "debug", "service", `Processing depot ${depot.ID}`);

      const schedule = selectVehicles([...vehicles], depot.MechanicHours);

      result.push({
        depotId: depot.ID,
        availableHours: depot.MechanicHours,
        totalTimeUsed: schedule.totalTime,
        totalImpact: schedule.totalImpact,
        selectedVehicles: schedule.selected,
      });
    }

    await Log("backend", "info", "service", "Scheduling completed");

    res.json(result);

  } catch (err) {
    await Log("backend", "error", "handler", "Scheduling failed");
    res.status(500).json({ error: err.message });
  }
});

/**
 * Start server
 */
app.listen(3000, async () => {
  console.log("Server running on http://localhost:3000");

  await Log("backend", "info", "service", "Server started");
});