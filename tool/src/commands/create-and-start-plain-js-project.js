import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import createLogger from "../logger.js";

const logger = createLogger("Create and Start Plain JS Project");

export default function create_and_start_empty_js_project(folderName) {
    if (!folderName) {
        logger.warning("Folder name is required.");
        process.exit(1);
    }

    const projectPath = path.join(process.cwd(), folderName);

    // 1️⃣ Create folder
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath, { recursive: true });
        logger.highlight(`Created folder: ${folderName}`);
    } else {
        logger.warning("Folder already exists.");
    }

    // 2️⃣ Create app.js
    const appFilePath = path.join(projectPath, "app.js");

    if (!fs.existsSync(appFilePath)) {
        fs.writeFileSync(
            appFilePath,
            `console.log("Hello from ${folderName}");\n`
        );
        logger.highlight("Created app.js");
    } else {
        logger.warning("app.js already exists.");
    }

    // 3️⃣ Open VS Code
    try {
        execSync(`code "${projectPath}"`, { stdio: "inherit" });
    } catch (err) {
        logger.warning("Could not open VS Code. Make sure 'code' is in your PATH.")
    }
}