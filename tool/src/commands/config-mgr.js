import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";

export function getConfig() {
    const moduleName = "tool"; // CLI name
    const explorer = cosmiconfigSync(moduleName);
    const result = explorer.search();

    if (result && result.config) {
        console.log(chalk.green("Found configuration"));
        return result.config;
    }

    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
}