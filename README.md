# MyReads Project

## Summary

A digital bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.

## Description

MyReads is a digital bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. It is built as a project for Udacity React Nanodegree.

### Getting Started

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](docs/SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Build

To start development with the project, you will need to run the following command:

```bash
npm install
```

This will install all node modules that the project relies on. You can then start the web server using the following command;

```bash
npm start
```

You can then open `localhost:3000` to view the MyReads in the browser. The page will automatically reload if you make changes to the code.

### Dependencies

The project relies on the installation on [Node.js](https://nodejs.org/en/).

### React

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Books Web Service

The MyReads application makes use of the Udacity React Books API. The service provides methods for searching a catalog of books based on a predefined list of terms. These terms are available at [docs/SEARCH_TERMS.md](docs/SEARCH_TERMS.md). 

You can read more about the web service at [docs/API.md](docs/API.md).

## Acknowledgements

The project icon is retrieved from [the Noun Project](docs/icon/icon.json). The original source material has been altered for the purposes of the project. The icon is used under the terms of the [Public Domain](https://creativecommons.org/publicdomain/zero/1.0/).

The project icon is by [Marjon Siero from the Noun Project](https://thenounproject.com/term/book/49107/).