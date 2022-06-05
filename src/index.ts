import * as Core from "@actions/core";
import Updater, { UpdateResult } from "./updater";

async function run(): Promise<void>
{
    try
    {
        const filePath: string = Core.getInput("file");
        var newVersion: string = Core.getInput("version");
        if (newVersion.startsWith('v'))
            newVersion = newVersion.substring(1);
        console.log(`File path: ${filePath}`);
        console.log(`New version: ${newVersion}`);
        const updateResult: UpdateResult = await Updater.update(filePath, newVersion); 
        console.log(`Version updated from ${updateResult.oldVersion} to ${updateResult.newVersion}`);
        setOutput("oldVersion", updateResult.oldVersion);
        setOutput("newVersion", updateResult.newVersion);
    }
    catch (error)
    {
        if (error instanceof Error)
        {
            Core.setFailed(error.message);
        }
    }
}

function setOutput(name: string, value: string): void
{
    console.log(`::set-output name=${name}::${value}`);
}

run();
