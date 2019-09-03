# WordPress Theme Boilerplate

Webpack dev server, Sass, Barba JS, GoLight JS, Prettier

Develop wordpress themes with this convinient setup.

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

- `-e` or `--entry`: default: `/YOUR_PROCESS_CWD/src/javascripts/main.js` (you can pass an array for mutiple entry points)
- `-p` or `--port`: default: `8080`
- `-h` or `--host`: default: `localhost`
- `-P` or `--proxy`: default: `http://localhost:8000`
- `--publicPath`: default: `/wp-content/themes/FOLDER_BASENAME`

## Donate

You can buy me a cup of coffee, if you'd like ^^

[![Donate](https://www.paypalobjects.com/en_US/CH/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AXJFXBX8XLYXQ&source=url)
