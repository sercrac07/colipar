import { argv } from "node:process"
import { getFlag } from "./lib/utils"

interface ColiparOptions<Flags extends Flag<string>> {
  /** The flags to capture and parse. */
  flags: Flags
}

type Flag<T extends string> = {
  /** The name of the flag. */
  [key in T]: FlagOptions
}

interface FlagOptions {
  /** The type of the flag. */
  type: "string" | "boolean"
  /** The short version of the flag. */
  short?: string
}

/**
 * Captures and parses user input from the command line.
 *
 * [API Reference](https://github.com/sercrac07/colipar#coliparoptions)
 */
export default function colipar<T extends string, Flags extends Flag<T>>(
  options: ColiparOptions<Flags>
): {
  [Key in keyof typeof options.flags]: ((typeof options.flags)[Key]["type"] extends "string" ? string : (typeof options.flags)[Key]["type"] extends "boolean" ? boolean : never) | undefined
} {
  const args = argv.slice(2)

  const obj = {} as Record<string, string | boolean | undefined>
  Object.keys(options.flags).forEach(key => {
    const flag = options.flags[key as T]
    if (flag.type === "boolean") {
      obj[key] = getFlag(`--${key}`, "boolean", args)
      if (flag.short) obj[key] = getFlag(`-${flag.short}`, "boolean", args)
    } else {
      obj[key] = getFlag(`--${key}`, "string", args)
      if (flag.short) obj[key] = getFlag(`-${flag.short}`, "string", args)
    }
  })
  return obj as {
    [Key in keyof typeof options.flags]: (typeof options.flags)[Key]["type"] extends "string" ? string : (typeof options.flags)[Key]["type"] extends "boolean" ? boolean : never
  }
}
