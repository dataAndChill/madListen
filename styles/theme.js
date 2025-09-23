// styles/theme.js
export const palette = {
  // base surfaces
  bg: '#ffffff',
  card: '#ffffff',
  surface: '#ffffff',

  // text
  text: '#222222',
  textDim: '#555555',

  // accents
  primary: '#1e90ff',

  // misc
  success: '#35d07f',
  warn: '#ffb020',
  danger: '#ff5d5d',
  divider: '#e5e7eb', // light gray border/divider
};

export const radius = { sm: 8, md: 12, lg: 18, xl: 24 };
export const space  = { xs: 6, sm: 10, md: 16, lg: 24, xl: 36 };

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
};
