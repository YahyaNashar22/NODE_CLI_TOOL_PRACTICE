#!/usr/bin/env node
import arg from "arg";
import { getConfig } from "../src/commands/config-mgr.js";
import { start } from "../src/commands/start.js";
import createLogger from "../src/logger.js"

const logger = createLogger("tool");

try {

    const args = arg({
        "--start": Boolean,
        "--build": Boolean
    });

    if (args['--start']) {
        const config = getConfig();
        start(config);
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