<div align="center">
  <h1>io.insure</h1>
  <h2>The Web UI for IO.Insure Project</h2>
</div>

## Project Structure

```
io.ensure
├── dist
├── docs
├── environment
├── node_modules
├── public
├── src
│   ├── assets
│   │   ├── fonts
│   │   ├── icon
│   │   ├── img
│   │   └── scss
│   ├── components
│   │   ├── common
│   ├── core
│   │   ├── api
│   │   ├── config
│   │   ├── helpers
│   │   └── storage
│   ├── locales
│   ├── plugins
│   │   └── components
│   ├── router
│   │   └── guards
│   │   └── modules
│   ├── store
│   │   └── modules
│   └── views
├── tests
│   ├── e2e
│   └── unit
└── tmp
```

* **dist**: The `dist` directory is meant to be served by an HTTP server.
* **docs**: Project Documentation
* **environment** Docker configuration folder, containing all related scripts/configuration to start a docker container.
* **node_modules**: The `node_modules` folder is used by the NPM (Node Package Manager) or Yarn, to install the packages.
* **public** folder used to serve static files, a folder that is visible when running application. Everything inside this folder will be possible to access when web server is running.
* **src**: The `src` directory organize the source code of the application.
  * **assets**: The `assets` folder is where we save the assets imported into the application.
    * **fonts** Web fonts are stored inside this folder. Use `woff`/`woff2` formats for better compatibility.
    * **icon**: Application icons.
    * **img**: Image assets of the application. It's **important** compress the images to not increase the size of the project. Use a tool like [TinyJPG](https://tinyjpg.com/)
    * **scss**: The SCSS files. It's managed by the SASS. The folder structure inside follow the [SASS Guidelines](https://sass-guidelin.es/#the-7-1-pattern)
  * **components**: All the components of the project. Each module will contain its respective folder.
    * **common** Common/Generic components to be shared across application. Like form fields, navigation bars, cards, etc. Try to group components by its functionality.
  * **core**: The reusable functions of the system, be **DRY**!.
      * **api**: The client implementation of API.
      * **config**: The application configuration, usually it will be used to keep environment variables and other constant related configuration.
      * **helpers**: Helper functions to use across application.
      * **storage**: Storage drivers (Cookie, LocalStorage, etc)
  * **locales**: Holds the internationalization, the locales files. It's managed by the `vue-i18n` package.
  * **plugins**: The `plugins` folder is used to store bootstrap files to add global-level functionality to Vue.
      * **components** 3rd party Vue components
  * **router**: Contains all the routes of the project and its configurations. It's managed by the vue-router.
    * **guards**: Vue Router guards to execute actions before/after entering new route.
    * **modules**: The `modules` directory organize each route module.
  * **store**: Here we can find the Vuex instance and its configurations.
    * **modules**: The `modules` directory organize each module of the Vuex and it contains the modules's mutations, getters, setters and states.
  * **views**: The view components that are used in the routes. This components are separated in a different directory because they represent entires pages. Each Module have its own view folder.
* **tests**: All the tests of the application, such E2E, Unit, etc.
    * **e2e**: Holds the End to End tests. It's managed by the `Cypress` and `Jest`.
    * **unit**: Holds the unit tests. It's managed by the `Jest`.
* **tmp** folder to store temporary files

---

# Further Reading

* [Coding Guidelines](./CODING.md)
* [Development Tips](./DEVELOPMENT.md)
* [Component Structure](./STRUCTURE.md)
* [Component Lifecycle](./LIFECYCLE.md)
* [UI Styling](./STYLING.md)
* [Vuex best practices](./VUEX.md)
* [API details](./API.md)
* [Environment Variables](./ENVS.md)
* [Internacionalization](./i18n.md)
* [Testing](./TESTING.md)
