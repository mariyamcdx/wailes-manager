module.exports = {
  plugins: ["react"],
  extends: ["react-app", "prettier"],
  rules: {
    "object-shorthand": ["warn", "properties"],
    "no-unused-vars": "warn",
    "interface-name-prefix": "off",
    "explicit-function-return-type": "off",
    "explicit-module-boundary-types": "off",
    "no-explicit-any": "off",
  },
};
