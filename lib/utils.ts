import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert a client / case name to a filesystem slug.
 *  "Allegiance Education" -> "allegiance-education"
 *  "Tax2Win"              -> "tax2win"
 *  "Yug Vaastra"          -> "yug-vaastra"
 *  "Modernwala's"         -> "modernwalas"
 */
export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
