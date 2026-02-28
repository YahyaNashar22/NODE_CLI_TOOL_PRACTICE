#!/usr/bin/env node
import arg from "arg";
import { getConfig } from "../src/commands/config-mgr.js";
import { start } from "../src/commands/start.js";
import createLogger from "../src/logger.js"
import create_and_start_empty_js_project from "../src/commands/create-and-start-plain-js-project.js";

const logger = createLogger("tool");

try {

    const args = arg({
        "--start": Boolean,
        "--new-js": String,
    });

    if (args['--start']) {
        const config = getConfig();
        start(config);
    }

    if (args["--new-js"]) {
  create_and_start_empty_js_project(args["--new-js"]);
}
} catch (error) {
    logger.warning(error.message + "\n");
    usage();
}

function usage() {
    logger.debug(`tool [CMD]
        --start\tStarts the app
        --build\tBuilds the app`);
}