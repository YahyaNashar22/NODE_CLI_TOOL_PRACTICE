#!/usr/bin/env node
const arg = require("arg");

try {

    const args = arg({
        "--start": Boolean,
        "--build": Boolean
    });
    
    if (args['--start']){
        console.log("Starting the app");
    }
}catch(error) {
    console.log(error.message + "\n");
    usage();
}

function usage(){
    console.log(`tool [CMD]
        --start\tStarts the app
        --build\tBuilds the app`);
}