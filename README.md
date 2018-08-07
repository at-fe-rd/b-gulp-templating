# GULP BOILERPLATE

> HTML boilerplate based on Gulp for assets management, and EJS as html template engine. Useful for quick interactive mockup development, easily transposable to any Backend Framework.

## Frontend features

* Frontend(HTML) boilerplate with basic home-category pages
* Ejs
* Gulp
* SASS
* Bootstrap 4
* Jquery
* i18n
* Others


Just as easy !
Web site should be accessible from localhost:1221.
Port is configurable by `.env` file settings (just copy `.env.example`).

## Development

### Commands
* `npm install` to install dependences

* `gulp serve` or `npm start`
Start Gulp assets compilation and express server with hot reloading support.

* `gulp task_name`
Start Gulp task which is defined in `gulpfile.js`

### Project Structure
* `assets` for Font, Image, I18N, library, you can actually replace codes inside this folder by other what you think better.
* `data` is a folder that declaring data what use in the template to avoid hard code, duplicate and more useful.
* `stylesheet` is a folder that contains styling SCSS.
* `js` is a folder that creates some task and loader for the build time
* `views` is a folder contained your template, it includes the main sections such as `layout`, `pages` and `partials`, you must comply with this structure to make sure your code works well.

#### Configurations
- `gulpfile.js` & `server.js`
- CRUD new route in `server.js`
- Add string, paragraph in folder assets/i18n. 

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
