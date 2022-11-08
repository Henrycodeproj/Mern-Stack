import React, { useRef } from "react";
import { Widget } from "@uploadcare/react-widget";
import "./ImageUploader.css"

export const ImageUploader = () => {
  const widgetApi = useRef();

  return (
    <div>
      <button
        onClick={() => {
          const dialog = widgetApi.current.openDialog();
          console.log(Object.getOwnPropertyNames(widgetApi.current));
          console.log(widgetApi.current.value())
          dialog.switchTab("url");
        }}
      >
        Click me
      </button>

      <Widget ref={widgetApi}
      previewStep = "true"
      imagesOnly = "true"
      data-effects="flip, crop, enhance, rotate, blur, grayscale, sharp, mirror, invert"
      publicKey="82efe8e1794afced30ba" preloader={null} />
    <input
    type="hidden"
    role="uploadcare-uploader"
    data-public-key="demopublickey"
    data-tabs="file gphotos"
    data-effects="flip, crop, enhance, rotate, blur, grayscale, sharp, mirror, invert"
    />
    </div>
  );
};