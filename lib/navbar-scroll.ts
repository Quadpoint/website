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

export function getNavbarShadowClassName(): string {
  return "shadow-none";
}

export function getNavbarSurfaceClassName(
  isScrolled: boolean,
  isHomepage: boolean,
  hasMeasuredScroll: boolean
): string {
  return isHomepage && hasMeasuredScroll && !isScrolled
    ? "bg-transparent"
    : "bg-[#0f1e3d]/64 backdrop-blur-xl backdrop-saturate-150";
}

export function getNavbarVisibilityClassName(isVisible: boolean): string {
  return isVisible ? "translate-y-0" : "-translate-y-full";
}

export function getNavbarTransitionClassName(): string {
  return "transition-[translate,background-color,box-shadow,backdrop-filter]";
}

export function getNavbarDesktopLinkClassName(isActive: boolean): string {
  return isActive
    ? "text-[#fbb52b]"
    : "text-white/80 hover:text-white";
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
