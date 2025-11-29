// TODO: Define layout constants (spacing, dimensions)
export const Layout = {
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  // Dimensions
  buttonHeight: {
    sm: 40,
    md: 48,
    lg: 56,
  },
  
  // Screen padding
  screenPadding: 20,
  
  // Card padding
  cardPadding: 16,
} as const;

export default Layout;

