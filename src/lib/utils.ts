export function getFlag<T extends "string" | "boolean">(flag: string, type: T, argv: string[]): T extends "string" ? string | undefined : boolean {
  // Find the position of the flag in the argv array
  const flagIndex = argv.findIndex(arg => arg.startsWith(`${flag}=`) || arg === flag)

  if (type === "boolean") {
    if (flagIndex !== -1) {
      const value = argv[flagIndex].split("=")[1]
      if (typeof value === "undefined") {
        return true as T extends "string" ? string | undefined : boolean // Solo la flag sin valor, interpretamos como true
      }
      // Interpret specific values as true/false
      return (value === "true") as T extends "string" ? string | undefined : boolean
    } else {
      return undefined as T extends "string" ? string | undefined : boolean
    }
  } else if (type === "string") {
    if (flagIndex !== -1) {
      const [, value] = argv[flagIndex].split("=")
      if (typeof value !== "undefined") {
        // Return the value of the flag
        return value.replace(/^["']|["']$/g, "") as T extends "string" ? string | undefined : boolean
      } else if (flagIndex + 1 < argv.length) {
        // Return the next argument if no explicit value is assigned
        return argv[flagIndex + 1] as T extends "string" ? string | undefined : boolean
      } else {
        return "" as T extends "string" ? string | undefined : boolean
      }
    } else {
      return undefined as T extends "string" ? string | undefined : boolean
    }
  }

  return undefined as T extends "string" ? string | undefined : boolean
}
