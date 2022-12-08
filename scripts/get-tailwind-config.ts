// Name: Get Tailwind Config
// Author: Eduard Uffelmann
// Twitter: @schmedu_

import "@johnlindquist/kit"
import { importTailwindModule } from "./auto-generated-import-tailwind-module";
import { getTailwindProjects } from "../lib/tailwind-lib";

interface ColorChoice {
    name: string;
    shade?: string;
}

async function createColorChoice(theme) {
    let choices = [];
    for (let color of Object.keys(theme.extend.colors)) {
        if (typeof theme.extend.colors[color] === "string") {
            choices.push({
                name: color,
                description: theme.extend.colors[color],
                value: { name: color, shade: undefined },
                preview: `<div style='background-color: ${theme.extend.colors[color]}; color: ${theme.extend.colors[color]}; width: 100%; height: 100%;'>${'<br/>'.repeat(100)}</div>`
            });
        } else {
            if (theme.extend.colors[color]["DEFAULT"]) {
                choices.push({
                    name: `${color} [...]`,
                    value: { name: color, shade: "DEFAULT" },
                    description: theme.extend.colors[color]["DEFAULT"],
                    preview: `<div style='background-color: ${theme.extend.colors[color]['DEFAULT']}; color: ${theme.extend.colors[color]['DEFAULT']}; width: 100%; height: 100%;'>${'<br/>'.repeat(100)}</div>`
                });
            } else if (theme.extend.colors[color]["500"]) {
                choices.push({
                    name: `${color} [...]`,
                    value: { name: color, shade: "500" },
                    description: theme.extend.colors[color]["500"],
                    preview: `<div style='background-color: ${theme.extend.colors[color]['500']}; color: ${theme.extend.colors[color]['500']}; width: 100%; height: 100%;'>${'<br/>'.repeat(100)}</div>`
                });
            } else {
                notify("no default color found");
                await inspect({ color: theme.extend.colors[color] });
            }

        }
    }
    return choices;
}

async function getShadeColor(color: ColorChoice, theme: any) {
    let choices = [];
    for (let shade of Object.keys(theme.extend.colors[color.name])) {
        choices.push({
            name: `${color.name}-${shade}`,
            value: { name: color.name, shade },
            description: theme.extend.colors[color.name][shade],
            preview: `<div style='background-color: ${theme.extend.colors[color.name][shade]}; color: ${theme.extend.colors[color.name][shade]}; width: 100%; height: 100%;'>${'<br/>'.repeat(100)}</div>`
        });
    }
    return await arg("Which shade?", choices);
}

let folder = await arg("Which tailwind project?", await getTailwindProjects());
let { theme } = await importTailwindModule(folder)

if (!theme?.extend?.colors) {
    notify("No colors found in tailwind.config.js");
    exit()
}

let color: ColorChoice = await arg({
    name: "Which color?",
    flags: {
        shades: {
            name: "Show all shades",
            shortcut: "cmd+s"
        }
    },
}, await createColorChoice(theme));

if (flag?.shades) {
    //@ts-ignore
    color = await getShadeColor(color, theme);
}

await copy(color.shade ? theme.extend.colors[color.name][color.shade] : theme.extend.colors[color.name]);
