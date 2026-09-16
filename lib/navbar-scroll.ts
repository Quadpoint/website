const TOP_THRESHOLD = 16;
const DIRECTION_THRESHOLD = 8;

interface NavbarScrollInput {
  currentY: number;
  previousY: number;
  wasVisible: boolean;
  mobileOpen: boolean;
}

interface NavbarScrollState {
  isScrolled: boolean;
  isVisible: boolean;
}

export function getNavbarShadowClassName(
  isScrolled: boolean,
  isVisible: boolean
): string {
  return isScrolled && isVisible
    ? "shadow-[0_1px_0_0_#e5e7eb]"
    : "shadow-none";
}

export function getNavbarScrollReference(
  currentY: number,
  previousY: number
): number {
  const passedDirectionThreshold =
    Math.abs(currentY - previousY) > DIRECTION_THRESHOLD;

  return currentY <= TOP_THRESHOLD || passedDirectionThreshold
    ? currentY
    : previousY;
}

export function getNavbarScrollState({
  currentY,
  previousY,
  wasVisible,
  mobileOpen,
}: NavbarScrollInput): NavbarScrollState {
  if (currentY <= TOP_THRESHOLD) {
    return { isScrolled: false, isVisible: true };
  }

  if (mobileOpen) {
    return { isScrolled: true, isVisible: true };
  }

  const scrollDelta = currentY - previousY;

  if (scrollDelta > DIRECTION_THRESHOLD) {
    return { isScrolled: true, isVisible: false };
  }

  if (scrollDelta < -DIRECTION_THRESHOLD) {
    return { isScrolled: true, isVisible: true };
  }

  return { isScrolled: true, isVisible: wasVisible };
}
