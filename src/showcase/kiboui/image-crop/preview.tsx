import { XIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { ImageCrop, ImageCropApply, ImageCropContent, ImageCropReset } from "./index";
import { Button } from "@/showcase/_shared/kiboui/ui/button";
import { Input } from "@/showcase/_shared/kiboui/ui/input";

// Demo adapted from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/image-crop) — next/image replaced
// with a plain <img> for the SPA environment.

export default function Preview() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCroppedImage(null);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCroppedImage(null);
  };

  if (!selectedFile) {
    return (
      <div className="w-full">
        <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-6">
          <Input
            accept="image/*"
            className="w-fit max-w-full"
            onChange={handleFileChange}
            type="file"
          />
          <p className="text-muted-fg text-xs">
            Pick a local image file to crop it in the browser.
          </p>
        </div>
      </div>
    );
  }

  if (croppedImage) {
    return (
      <div className="w-full">
        <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Cropped"
            className="rounded-md border"
            height={100}
            src={croppedImage}
            width={100}
          />
          <Button onClick={handleReset} size="icon" type="button" variant="ghost">
            <XIcon className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex min-h-96 flex-col items-center justify-center p-6">
        <ImageCrop
          aspect={1}
          file={selectedFile}
          maxImageSize={1024 * 1024} // 1MB
          onComplete={() => undefined}
          onCrop={setCroppedImage}
        >
          <ImageCropContent className="max-w-md" />
          <div className="flex items-center gap-2">
            <ImageCropApply />
            <ImageCropReset />
            <Button onClick={handleReset} size="icon" type="button" variant="ghost">
              <XIcon className="size-4" />
            </Button>
          </div>
        </ImageCrop>
      </div>
    </div>
  );
}
