// Name: Create Tailwind Import functions
// Author: Eduard Uffelmann
// Twitter: @schmedu_
// Watch: ~/WebstormProjects/*

import "@johnlindquist/kit"
import { getTailwindProjects } from "../lib/tailwind-lib";

async function createFile(folders) {
    let folderImportStatements = folders.reduce((acc, folder) => acc += `if (folder === "${folder}") {return await import("${home()}/WebstormProjects/${folder}/tailwind.config.js")}\n`, "")
    let TEMPLATE = `// AUTO GENERATED FILE, DO NOT EDIT
    export async function importTailwindModule(folder) {
        ${folderImportStatements}
    return { theme: {} }
}
`
    await writeFile(kenvPath("kenvs", "tailwind", "scripts", "auto-generated-import-tailwind-module.ts"), TEMPLATE)
}

let tailwindDirectories = await getTailwindProjects()
await createFile(tailwindDirectories)
