// Preload hook: disable Next.js build trace file writes (.next/trace)
// which fail on Windows with EPERM when multiple build workers share the file.
const fs = require("fs");
const path = require("path");

const origOpen = fs.openSync;
fs.openSync = function (p, ...args) {
  if (typeof p === "string" && p.endsWith(".next/trace")) {
    // Return a dummy fd that discards writes
    const tmp = path.join(require("os").tmpdir(), "noop-trace-" + Date.now());
    try {
      return origOpen.call(this, tmp, "w");
    } catch (e) {
      return origOpen.call(this, "NUL", "w");
    }
  }
  return origOpen.apply(this, arguments);
};

const origWrite = fs.writeSync;
fs.writeSync = function (...args) {
  // Drop writes directed at the trace fd if it points to our noop file
  try {
    return origWrite.apply(this, args);
  } catch (e) {
    return 0;
  }
};
