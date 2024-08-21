import { argv } from "node:process"
import { getFlag } from "./lib/utils"

interface CliucOptions<Flags extends Flag<string>> {
  flags: Flags
}

type Flag<T extends string> = {
  [key in T]: FlagOptions
}

interface FlagOptions {
  type: "string" | "boolean"
  short?: string
}

export default function cliuc<T extends string, Flags extends Flag<T>>(
  options: CliucOptions<Flags>
): {
  [Key in keyof typeof options.flags]: (typeof options.flags)[Key]["type"] extends "string" ? string : (typeof options.flags)[Key]["type"] extends "boolean" ? boolean : never
} {
  const args = argv.slice(2)

  const obj = {} as Record<string, string | boolean | undefined>
  Object.keys(options.flags).forEach(key => {
    if (options.flags[key as T].type === "boolean") {
      obj[key] = getFlag(`--${key}`, "boolean", args)
      if (options.flags[key as T].short) obj[key] = getFlag(`-${options.flags[key as T].short}`, "boolean", args)
    } else {
      obj[key] = getFlag(`--${key}`, "string", args)
      if (options.flags[key as T].short) obj[key] = getFlag(`-${options.flags[key as T].short}`, "string", args)
    }
  })
  return obj as {
    [Key in keyof typeof options.flags]: (typeof options.flags)[Key]["type"] extends "string" ? string : (typeof options.flags)[Key]["type"] extends "boolean" ? boolean : never
  }
}
