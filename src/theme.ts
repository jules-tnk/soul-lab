import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#fef2f2',
      100: '#fde8e8',
      200: '#f9b4b4',
      300: '#f28080',
      400: '#e63946',
      500: '#e63946',
      600: '#c62828',
      700: '#a11d1d',
      800: '#7f1515',
      900: '#5c0f0f',
    },
    accent: {
      teal: '#2a9d8f',
      blue: '#457b9d',
      gold: '#e9c46a',
      orange: '#f4a261',
      purple: '#6a4c93',
    },
  },
  fonts: {
    heading: `'Inter', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#fafafa',
        color: 'gray.800',
      },
      '.ai-markdown': {
        'h1, h2, h3, h4': {
          fontWeight: 700,
          mt: 2,
          mb: 1,
        },
        h1: { fontSize: 'sm' },
        h2: { fontSize: 'xs' },
        h3: { fontSize: 'xs' },
        'p': { mb: 1.5 },
        'ul, ol': {
          pl: 4,
          mb: 1.5,
        },
        li: { mb: 0.5 },
        strong: { fontWeight: 600 },
        code: {
          bg: 'gray.100',
          px: 1,
          borderRadius: 'sm',
          fontSize: '2xs',
        },
        pre: {
          bg: 'gray.100',
          p: 2,
          borderRadius: 'md',
          overflowX: 'auto',
          mb: 1.5,
          '& code': {
            bg: 'transparent',
            p: 0,
          },
        },
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

export default theme
