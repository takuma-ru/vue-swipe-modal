# @web-bottom-sheet/core

## Description
Web modal component that can be opened and closed by swiping.

This package is the body of component, used as web-component.

## Installation
```bash
npm i @web-bottom-sheet/core
```

## Usage
```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>web-bottom-sheet/core</title>
  <link rel="stylesheet" href="./index.css" />
  <script type="module" src="/node_modules/@web-bottom-sheet/core"></script>
</head>

<body>
  <button id="button">open</button>

  <web-bottom-sheet id="web-bottom-sheet" snap-point="50vh" is-fullscreen="false">
    <h1>Web Bottom Sheet</h1>
    <p>
      This is a web component that mimics the native bottom sheet. It is
      implemented using Lit and TypeScript.
    </p>
  </web-bottom-sheet>

  <script>
    const button = document.getElementById("button");
    const sheet = document.querySelector("web-bottom-sheet");

    button.addEventListener("click", () => {
      sheet.open = !sheet.open;
    });

    sheet.addEventListener("on-close", () => {
      sheet.open = false;
    });
  </script>
</body>

</html>
```