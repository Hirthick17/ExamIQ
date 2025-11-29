import { useTheme as useThemeContext } from '../src/contexts/ThemeContext';

// TODO: Implement useTheme hook
export function useTheme() {
  const themeContext = useThemeContext();
  
  // Add additional theme logic here if needed
  
  return {
    ...themeContext,
    // Add custom theme methods or computed values
  };
}

