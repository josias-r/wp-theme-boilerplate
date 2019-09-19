# WordPress Theme Boilerplate

Webpack dev server, Sass, Barba JS, GoLight JS, Prettier

Conveniently develop WordPress themes with ES6 and SCSS and watch your page update live.

### Features

- **SCSS**: Modular CSS with variables and functions
- **Modern JavaScript**: Write Javascript using the latest syntax.
- **Modular JavaScript**: Split your JS files into multiple files for better organization and import NPM libraries.
- **HMR**: Watch your changes live while developing
- **Browser support**: With the help of Babel and Browserslist everything will be compiled to support old Browsers
- **Linters**: [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [stylelint](https://stylelint.io/) will help you while developing. (Make sure you have the corresponding packages installed for your editor)
- **Customizable**: All the above features origin from wptb-scripts which allows you to pass custom settings for your environment. [see configuration](#configuration)

### Installation

1. Clone this repo into your WordPress theme folder (you can rename the folder).
2. Inside the cloned folder run `npm i` to install all the packages.
3. Run find and replace (`cmd/ctrl` + `shift` + `f` in atom) and replace all `boilerplate-slug` and `boilerplate_slug` instances with your own slug.

Optionally, read through the `functions.php` and check the configuration for a quick setup of your theme.

> Note: This Boilerplate comes with the JavaScript libraries `Barba JS` and `GoLight JS` preinstalled. You can remove them and write your own `main.js` if you want.

### Usage

To start the development server run `npm start`

To build for a release run `npm run build`

### Configuration

Inside the `package.json` there are the following arguments optional for the wptb-scripts `start` and `build` scripts:

- `-e` or `--entryFiles`: *default*: `/YOUR_PROCESS_CWD/src/javascripts/main.js`
  - Single path or array of paths to your main JavaScript files (absolute paths or relative to your process.cwd).
  - Example: `--entryFiles={src/main.js,src/blocks/gb-block.js}`
- `-p` or `--port`: *default*: `8080`
  - The port on which you can preview your changes
- `-h` or `--host`: *default*: `localhost`
  - The host on which you can preview your changes
- `-P` or `--proxy`: *default*: `http://localhost:8000`
  - The URL (include *http://*) on which your local WordPress installation runs on.
  - If you are only making small changes to an no-local website css and js should get hot-loaded anyway.
- `--publicPath`: *default*: `/wp-content/themes/FOLDER_BASENAME`
  - The path where your proxied files are available.

## Donate

You can buy me a cup of coffee, if you'd like ^^

[![Donate](https://www.paypalobjects.com/en_US/CH/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AXJFXBX8XLYXQ&source=url)
