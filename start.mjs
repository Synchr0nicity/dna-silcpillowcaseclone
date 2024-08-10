import { exec } from "child_process";
import open from "open";

// Run Parcel
const parcelProcess = exec(
  "parcel src/index.html"
);

// Open Chrome when Parcel is ready
parcelProcess.stdout.on("data", (data) => {
  console.log(data.toString());
  if (
    data.toString().includes("Server running at")
  ) {
    // Extract the URL from Parcel's output
    const urlMatch = data
      .toString()
      .match(/http:\/\/localhost:\d+/);
    if (urlMatch) {
      open(urlMatch[0], {
        app: { name: "google chrome" },
      });
    }
  }
});

parcelProcess.stderr.on("data", (data) => {
  console.error(data.toString());
});
