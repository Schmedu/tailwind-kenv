import "@johnlindquist/kit"

export async function getTailwindProjects() {
    let directories = await readdir(
        await env("PROJECTS_FOLDER", "In which folder do you store all projects?"),
        {
            withFileTypes: true,
        }
    );

    return directories
        .filter((directory) => directory.isDirectory())
        .filter(async (directory) => await isFile(`${await env("PROJECTS_FOLDER")}/${directory.name}/tailwind.config.js`))
        .map((directory) => directory.name);
}