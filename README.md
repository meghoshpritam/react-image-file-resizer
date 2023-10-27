# React Image File Resizer

`@meghoshpritam/react-image-file-resizer` is a react module that can rescaled local images.

- You can change image's width, height, format, rotation and quality.
- It returns resized image's new base64 URI or Blob. The URI can be used as the source of an `<Image>` component.

## Setup

Install the package:

```shell
npm i @meghoshpritam/react-image-file-resizer
```

or

```shell
yarn add @meghoshpritam/react-image-file-resizer
```

or

```shell
pnpm i @meghoshpritam/react-image-file-resizer
```

## Usage

```javascript
import Resizer from "react-image-file-resizer";

Resizer.imageFileResizer({
  file, // Is the file of the image which will resized.
  maxWidth, // Is the maxWidth of the resized new image.
  maxHeight, // Is the maxHeight of the resized new image.
  compressFormat, // Is the compressFormat of the resized new image.
  quality, // Is the quality of the resized new image.
  rotation, // Is the degree of clockwise rotation to apply to uploaded image.
  responseUriFunc, // Is the callBack function of the resized new image URI.
  outputType, // Is the output type of the resized new image.
  minWidth, // Is the minWidth of the resized new image.
  minHeight, // Is the minHeight of the resized new image.
  keepAspectRatio // Is the keepAspectRatio of the resized new image.
});
```

## Example 1

First, wrap the resizer:

```javascript
import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer({
      file,
      maxWidth: 300,
      maxHeight: 300,
      compressFormat: "JPEG",
      quality: 100,
      rotation: 0,
      keepAspectRatio: true,
      responseUriFunc: (uri) => {
        resolve(uri);
      },
      outputType: "base64"
  });
});
```

And then use it in your async function:

```javascript
const onChange = async (event) => {
  try {
    const file = event.target.files[0];
    const image = await resizeFile(file);
    console.log(image);
  } catch (err) {
    console.log(err);
  }
};
```

## Example 2

```javascript
import React, { Component } from "react";
import Resizer from "react-image-file-resizer";

class App extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      newImage: "",
    };
  }

  fileChangedHandler(event) {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer({
          file: event.target.files[0],
          maxWidth: 300,
          maxHeight: 300,
          compressFormat: "JPEG",
          quality: 100,
          rotation: 0,
          keepAspectRatio: true,
          responseUriFunc: (uri) => {
            console.log(uri);
            this.setState({ newImage: uri });
          },
          outputType: "base64",
          minWidth: 200,
          minHeight: 200
      });
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.fileChangedHandler} />
        <img src={this.state.newImage} alt="" />
      </div>
    );
  }
}

export default App;
```

| Option            | Description                                                                                                                                                            | Type       | Required |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `file`            | Path of image file                                                                                                                                                     | `object`   | Yes      |
| `maxWidth`        | New image max width (ratio is preserved)                                                                                                                               | `number`   | Yes      |
| `maxHeight`       | New image max height (ratio is preserved)                                                                                                                              | `number`   | Yes      |
| `compressFormat`  | Can be either **JPEG**, **PNG** or **WEBP**.                                                                                                                           | `string`   | Yes      |
| `quality`         | A number between 0 and 100. Used for the JPEG compression.(if no compress is needed, just set it to 100)                                                               | `number`   | Yes      |
| `rotation`        | Degree of clockwise rotation to apply to the image. Rotation is limited to multiples of 90 degrees.(if no rotation is needed, just set it to 0) (0, 90, 180, 270, 360) | `number`   | Yes      |
| `responseUriFunc` | Callback function of URI. Returns URI of resized image's base64 format. ex: `uri => {console.log(uri)});`                                                              | `function` | Yes      |
| `outputType`      | Can be either **base64**, **blob** or **file**.(Default type is base64)                                                                                                | `string`   | No       |
| `minWidth`        | New image min width (ratio is preserved, defaults to null)                                                                                                             | `number`   | No       |
| `minHeight`       | New image min height (ratio is preserved, defaults to null)                                                                                                            | `number`   | No       |
| `keepAspectRatio` | Keep aspect ratio of the image (defaults to true)                                                                                                                      | `boolean`  | Yes       |

## License

[MIT](https://opensource.org/licenses/mit-license.html)
