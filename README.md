# WordPress Theme Boilerplate

Webpack dev server, Sass, Barba JS, GoLight JS, Prettier

### Installation

1. Clone this repo into your WordPress theme folder (you can rename the folder).
2. Inside the cloned folder run `npm i` to install all the packages.
3. Run find and replace (`cmd/ctrl` + `shift` + `f` in atom) and replace all `boilerplate-slug` and `boilerplate_slug` instances with your own slug.

Optionally, read through the `functions.php` and check the configuration for a quick setup of your theme.

> Note: This Boilerplate comes with the JavaScript libraries `Barba JS` and `GoLight JS` preinstalled. You can remove them and write your own `main.js` if you want.

### Usage

To start the development server run `npm start`

To build for a release run `npm run build`

To build without production flag run `npm run build:dev`

### Configuration

Inside the `package.json` there are the following configurations inside `themeConf`:

- `"proxyTarget"`: `string` (default: `"http://localhost:8000"`)
- `"host"`: `string` (default: `"localhost"`)
- `"port"`: `number` (default: `8080`)
