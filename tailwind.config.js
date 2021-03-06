module.exports = {
  // mode: 'jit', // Allows exact px (e.g. left-[2323px]). Not yet stable.
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  // Let's tw take precedence over material classes (e.g. utility "first").
  // See https://sebastiandedeyne.com/why-we-use-important-with-tailwind/
  // for rationale and alternatives if this becomes a problem.
  important: true
}
