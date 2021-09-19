module.exports = {
  // mode: 'jit', // Allows exact px (e.g. left-[2323px]). Not yet stable.
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
