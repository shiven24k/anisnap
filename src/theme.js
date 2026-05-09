import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  fonts: {
    heading: `'Outfit', 'Noto Sans JP', sans-serif`,
    body: `'Outfit', 'Noto Sans JP', sans-serif`,
  },
  colors: {
    brand: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#E53935',
      600: '#C62828',
      700: '#B71C1C',
      800: '#8E0000',
      900: '#5F0000',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0A0A12' : '#F5F5F5',
        color: props.colorMode === 'dark' ? 'white' : '#1A1A2E',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        anime: {
          bg: '#E53935',
          color: 'white',
          _hover: { bg: '#C62828', transform: 'translateY(-2px)' },
        },
        glass: (props) => ({
          bg: props.colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100',
          color: props.colorMode === 'dark' ? 'white' : '#1A1A2E',
        }),
      },
    },
    Input: {
      variants: {
        anime: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'white',
            border: '1px solid',
            borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.200',
            color: props.colorMode === 'dark' ? 'white' : '#1A1A2E',
            _placeholder: { color: props.colorMode === 'dark' ? 'whiteAlpha.400' : 'gray.400' },
            _focus: { borderColor: 'red.500', boxShadow: '0 0 0 1px #E53935' },
          },
        }),
      },
    },
  },
});

export default theme;