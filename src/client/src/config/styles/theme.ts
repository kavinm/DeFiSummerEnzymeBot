import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#4F46E5',
    primaryLight: '#A5B4FC',
    primaryDark: '#3730A3',
    headers: '#F9FAFB',
    subHeaders: '#E5E7EB',
    placeholders: '#9CA3AF',
    iconsActive: '#F9FAFB',
    iconsInactive: '#6B7280',
    accentSurface: '#1F2937',
    accentCards: '#111827',
    accentOutlines: '#374151',
    error: '#EF4444',
    success: '#10B981',
    dark: '#141414',
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
  },
  styles: {
    // GLOBAL STYLES HERE
    global: {},
  },
});

export default theme;
