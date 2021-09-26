# Testing

Application has support for **2 types** of tests:

* Unit tests: using `Jest`
* E2E (End 2 End) tests: using `Cypress`

To run tests locally:

* `yarn test:unit`
* `yarn test:e2e`

## Development

Tests should be stored at `tests/unit` or `tests/e2e` or inside `__tests__` folder in the `src` directory.

### Unit Tests

* Tests should use **mocked data** most of cases. It will only have a few exceptions, that will need dynamic data or imported from another location.
* Each Unit Test **must** have at least 5 test closures.
* Make use of Jest helpers like `beforeEach`, `afterEach`, etc.
* Unit tests should be named in `camelCase`.
* Unit tests should contain `.spec` at end of the file name, if the tests are stored in `tests/unit` folder
  * Example: `tests/unit/Auth.spec.test`
* Case tests are stored in any of `__tests__` folders. Test name should be concise, preferably having the same name as the component / helper you will test.
  * Example: `src/core/helpers/env.js` => `src/core/helpers/__tests__/env.js`

#### Notes

* There is a example test writting inside `tests/unit` folder. Take a look to see how performe a component test.
* Application is forcing **80%** of code coverage at least. To check coverage, run `yarn test:unit --collect-coverage --coverageReporters="text-summary"`

#### Further Reading

* https://vue-test-utils.vuejs.org/guides/
* https://www.digitalocean.com/community/tutorials/vuejs-vue-testing
* https://vuetifyjs.com/en/getting-started/unit-testing/#test-runners
* https://jestjs.io/docs/en/api

### End ot End Tests

* Vue uses `Cypress` to run E2E tests.
* Due to the Natural Complexity of E2E Tests, application will use it in the future, but focus first on Unit tests first.
* E2E tests should be stored inside `tests/e2e/specs`.
* E2e tests should cover at **least 3 to 5** different situations.
* Unit tests should be named in `camelCase`.
* Use concise naming convention, preferentially appending numbers at the beggining.
  * Example: `tests/e2e/specs/001-checkApplication.js`, `tests/e2e/specs/001-authenticationPage.js`, ..., `tests/e2e/specs/010-checkUserProfile.js`


#### Further Reading

* https://cli.vuejs.org/core-plugins/e2e-cypress.html
* https://www.cypress.io/blog/2017/11/28/testing-vue-web-application-with-vuex-data-store-and-rest-backend/
* https://docs.cypress.io/guides/component-testing/introduction.html
* https://itnext.io/how-to-test-vue-apps-with-the-popular-cypress-framework-aa9342e2bd58
