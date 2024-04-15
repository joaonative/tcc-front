import { ref, deleteObject } from "firebase/storage";
import { imageDataBase } from "../firebase";

export const deleteImage = async (imageName: string): Promise<void> => {
  try {
    const imageRef = ref(imageDataBase, `images/${imageName}`);

    await deleteObject(imageRef);
  } catch (err) {
    console.log(err);
  }
};
