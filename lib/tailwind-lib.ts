import "@johnlindquist/kit"

export async function getTailwindProjects() {
    let directoriesRaw = await readdir(`${home()}/WebstormProjects`, {
        withFileTypes: true,
    });

    let tailwindDirectories = []
    for (let directory of directoriesRaw) {
        // if it is a folder
        if (directory.isDirectory()) {
            // if it has a tailwind.config.js
            if (await isFile(`${home()}/WebstormProjects/${directory.name}/tailwind.config.js`)) {
                tailwindDirectories.push(directory.name)
            }
        }
    }
    return tailwindDirectories
}