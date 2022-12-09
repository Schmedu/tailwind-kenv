import "@johnlindquist/kit"

export async function getTailwindProjects() {
    let directories = await readdir(
        await env("PROJECTS_FOLDER", "In which folder do you store all projects?"),
        {
            withFileTypes: true,
        }
    );

    let tailwindDirectories = []
    for (let directory of directories.filter((dirent) => dirent.isDirectory())) {
        // if it has a tailwind.config.js
        if (await isFile(`${home()}/WebstormProjects/${directory.name}/tailwind.config.js`)) {
            tailwindDirectories.push(directory.name)
        }
    }
    return tailwindDirectories
}