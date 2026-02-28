#!/usr/bin/env node
import arg from "arg";
import chalk from "chalk";
import { getConfig } from "../src/commands/config-mgr.js";
import { start } from "../src/commands/start.js";

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
    console.log(chalk.yellow(error.message + "\n"));
    usage();
}

function usage() {
    console.log(chalk.whiteBright(`tool [CMD]
        --start\tStarts the app
        --build\tBuilds the app`));
}