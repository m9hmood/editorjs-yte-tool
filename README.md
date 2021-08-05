# Youtube Embed Tool

Provides Youtube Embed for the [EditorJS](https://editorjs.io/).

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @m9hmoods/editorjs-yte-tool
```

Include module at your application

```javascript
const YteEmbed = require('@m9hmoods/editorjs-yte-tool');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@m9hmoods/editorjs-yte-tool).

`https://cdn.jsdelivr.net/npm/@m9hmoods/editorjs-yte-tool@latest`

Then require this script on page with CodeX Editor.

```html
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the EditorJS initial config.

```javascript
var editor = new EditorJS({
  ...
  
  tools: {
    ...
    youtube: YteEmbed,
  },
  
  ...
});
```

Or init Youtube Embed Tool with additional settings

```javascript
var editor = EditorJS({
  ...
  tools: {
    ...
    youtube: {
      class: YteEmbed,
      config: {
        wrapperClass: '...',
        inputClass: '...',
        inputPlaceholder: '...',
        buttonClass: '...',
        buttonText: '...',
        invalidText: '...',
      },
    },
  },
  
  ...
});
```

## Output data

| Field     | Type     | Description      |
| --------- | -------- | -----------------|
| url       | `string` | Youtube Embed URL|

```json
{
    "type" : "youtube",
    "data" : {
      "url": "https://www.youtube.com/embed/[VIDEO_KEY]"
    }
}
```
