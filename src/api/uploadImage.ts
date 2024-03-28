import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDataBase } from "../firebase";

export const uploadImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  imgRef: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("Nenhum arquivo selecionado.");
      return;
    }

    const imageRef = ref(imageDataBase, `images/${imgRef}`);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (context) {
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            async (blob) => {
              if (blob) {
                try {
                  const data = await uploadBytes(imageRef, blob);
                  const downloadUrl = await getDownloadURL(data.ref);
                  const imageUrl = downloadUrl;
                  resolve(imageUrl);
                } catch (error) {
                  reject(error);
                }
              }
            },
            "image/webp",
            0.8
          );
        }
      };
    };
  });
};
