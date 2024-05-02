import fs from "node:fs"
import { createUnimport } from "unimport"
import { consola } from "consola"

consola.start("Start Generating unimport types...")

const { init, generateTypeDeclarations } = createUnimport({
  presets: ["vue", "@vueuse/core"],
  addons: {
    vueTemplate: true,
  },
})

init()

await generateTypeDeclarations().then((text) => {
  fs.writeFileSync("./unimport.d.ts", text)
  consola.success("Generate unimport types successfully!")
})
