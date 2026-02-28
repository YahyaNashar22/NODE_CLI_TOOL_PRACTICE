import fs from "fs";
import path from "path";
import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
import betterAjvErrors from "better-ajv-errors";
import Ajv from "ajv";
import { fileURLToPath } from "url";

const ajv = new Ajv();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const schemaPath = path.join(dirname, "..", "config", "schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

//? Schema is used to validate user config inputs ( type safety)

export function getConfig() {
    const moduleName = "tool"; // CLI name
    const explorer = cosmiconfigSync(moduleName);
    const result = explorer.search();

    if (result && result.config) {
        console.log(chalk.green("Found configuration"));

        const rawConfig = result.config;
        const config =
            rawConfig && typeof rawConfig === "object" && "default" in rawConfig
                ? rawConfig.default
                : rawConfig;

        const isValid = ajv.validate(schema, config);

        if (!isValid) {
            console.log(chalk.yellow('Invalid configuration was supplied'));
            console.log(betterAjvErrors(schema, config, ajv.errors));
            process.exit(1);
        }

        return config;
    }

    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
}