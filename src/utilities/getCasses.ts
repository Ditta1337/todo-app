// This function takes an array of strings and return a string with all the classes separated by a space
export function getClasses(classes: string[]): string {
    return classes.filter(item => item !== "").join(" ").trim();
}
  