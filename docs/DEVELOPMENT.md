# Development

## Editors

### VSCode

In this repo you have available a `.vscode` folder with settings you might want
to use. It comes with some default configuration and recommended extensions.

**Recommended Extensions**

* `sort-imports`
* `stylelint`
* `Vetur`
* `Prettier - Code formatter`
* `npm Intellisense`
* `Visual Studio IntelliCode`
* `Auto Rename Tag`

**Note:** Check `.vscode/extensions.json` to see the recommended extensions.


## Git

### Recommendations:

* Rebase instead of merge
* Make your commit messages meaningful
* Commits should contain the reference Issue whenever is possible. Case there is no referring issue, try to use a concise commit message.
* The first line of the commit message needs to be concise. If there is more stuff to tell, use a new line. It will help other developers to understand the commit history.
* Avoid creating larger commits, try to split into smaller ones. Have one commit per logical change and one major feature per pull request
* Fix typos by amending or rebasing

### Example of a commit message

#### Good

```
Issue #123: ensure Location will populate necessary fields

- new prop added to Location component
- action added to handle better when location changes

```

```
Feature: Support new "description" field on all widgets

Update both the core helpers and UI to support an extended
"description" field on all objects. This allows us to generate more useful
product listings.

```

#### Bad

```
Fixed a typo.
```

```
Trying that thing again
```

```
Issue #123
```
