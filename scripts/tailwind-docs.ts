// Name: Tailwind Docs
// Author: Eduard Uffelmann
// Twitter: @schmedu_

import "@johnlindquist/kit"
let { JSDOM } = await npm("jsdom");

async function getHtml(url) {
    let html = await fetch(url).then((r) => r.text())
    let dom = new JSDOM(html)
    return dom.window.document.getElementById("content-wrapper")?.outerHTML
}

let alfredItem = await arg({
    name: "Choose a tailwind class",
    flags: {
        "open": {
            name: "Open in Browser",
            description: "Open the selected class in the browser",
            shortcut: `cmd+enter`,
        },
        "widget": {
            name: "Widget",
            description: "Create a widget for the selected class",
            shortcut: `cmd+shift+enter`,
        }
    }
},
    async (input) => {
        if (input.length < 1) return []

        let alfredCommand = await exec(`/opt/homebrew/bin/php /Users/schmedu/Desktop/Dropbox/Alfred/Alfred.alfredpreferences/workflows/user.workflow.268F5F1D-C440-40DF-80D1-12B01157ABF6/tailwindcss.php "${input}"`)
        let alfredConfig = JSON.parse(alfredCommand.stdout);

        return await Promise.all(alfredConfig.items.map(async (item: AlfredItem) => {
            item.content = await getHtml(item.quicklookurl)
            return {
                name: item.title,
                description: item.subtitle,
                value: item.quicklookurl,
                preview: item.content,
            }
        }))
    })

if (flag?.open) {
    await open(alfredItem.quicklookurl)
} else if (flag?.widget) {
    await widget(alfredItem.content)
}
