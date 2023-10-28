# React Image File Resizer 🌄✨

**`@meghoshpritam/react-image-file-resizer`** is your go-to magic wand for enhancing your React application with image resizing capabilities. 🚀

- Transform images effortlessly by altering their width, height, format, rotation, and quality.
- Obtain the resized image in either base64 URI or Blob format. The URI is perfect for directly sourcing images in your `<Image>` component.

## Quick Setup

Start by installing this enchanting package:

```shell
npm install @meghoshpritam/react-image-file-resizer
```

or

```shell
yarn add @meghoshpritam/react-image-file-resizer
```

or

```shell
pnpm install @meghoshpritam/react-image-file-resizer
```

## Casting Spells with Magic Resizing

```javascript
import Resizer from "@meghoshpritam/react-image-file-resizer";

Resizer.imageFileResizer({
  file, // The image file to be resized.
  maxWidth, // The maximum width for the new image.
  maxHeight, // The maximum height for the new image.
  compressFormat, // The image format for compression (JPEG, PNG, or WEBP).
  quality, // The quality of the resized image.
  rotation, // The degree of clockwise rotation to apply to the image.
  responseUriFunc, // The callback function for the resized image URI.
  outputType, // The output type for the resized image.
  minWidth, // The minimum width for the new image.
  minHeight, // The minimum height for the new image.
  keepAspectRatio, // Whether to maintain the aspect ratio of the resized image.
});
```

## Captivating Examples

### Example 1

Begin by invoking the resizer:

```javascript
import Resizer from "@meghoshpritam/react-image-file-resizer";

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

Now, wield your powers within an async function:

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

### Example 2

Behold, a React sorcerer at work:

```javascript
import React, { Component } from "react";
import Resizer from "@meghoshpritam/react-image-file-resizer";

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

Witness the Magic! 🔮

## Enchanting Options

| Option           | Description                                                                                    | Type     | Required |
| ---------------- | ---------------------------------------------------------------------------------------------- | -------- | -------- |
| `file`           | Path of the image file                                                                         | `object` | Yes      |
| `maxWidth`       | The new image's maximum width (aspect ratio is preserved)                                      | `number` | Yes      |
| `maxHeight`      | The new image's maximum height (aspect ratio is preserved)                                     | `number` | Yes      |
| `compressFormat` | The compression format for the image (JPEG, PNG, or WEBP)                                      | `string` | Yes      |
| `quality`        | A number between 0 and 100, used for JPEG compression (set to 100 if no compression is needed) | `number` | Yes      |
| `rotation`       | The degree of clockwise rotation to apply to the image (limited to multiples of 90 degrees)    | `number  |

`   | Yes      |
| `responseUriFunc` | The callback function for the URI of the resized image (e.g., `uri => {console.log(uri)}`)             | `function` | Yes      |
| `outputType`      | The output type for the resized image (base64, blob, or file)                                           | `string`   | No       |
| `minWidth`        | The new image's minimum width (aspect ratio is preserved, defaults to null)                            | `number`   | No       |
| `minHeight`       | The new image's minimum height (aspect ratio is preserved, defaults to null)                           | `number`   | No       |
| `keepAspectRatio` | Whether to maintain the aspect ratio of the image (defaults to true)                                    | `boolean`  | Yes      |

## License

[MIT License](https://opensource.org/licenses/mit-license.html) 📜