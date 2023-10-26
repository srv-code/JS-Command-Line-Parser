let can = false;

function initDebugger() {
  console.log('[DEBUG] INIT');
  can = true;
}

/**
 * Checks for the global flag and prints using regular JS console.log
 *
 * @params {any[]} args Whatever the fuck JS console prints
 */
function log(...args) {
  if (can) console.log('[DEBUG]', ...args);
}

module.exports = { initDebugger, log };
