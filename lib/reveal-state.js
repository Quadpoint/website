/** @returns {"visible"} */
export function getInitialRevealState() {
  return "visible";
}

/**
 * @param {boolean} isInView
 * @returns {"visible" | "hidden"}
 */
export function getPreparedRevealState(isInView) {
  return isInView ? "visible" : "hidden";
}
