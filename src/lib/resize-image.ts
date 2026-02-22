const MAX_WIDTH = 1200;
const QUALITY = 0.8;

export function resizeImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    // Skip non-image files or SVGs
    if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
      resolve(file);
      return;
    }

    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);

      // No resize needed if already small enough
      if (img.width <= MAX_WIDTH) {
        resolve(file);
        return;
      }

      const scale = MAX_WIDTH / img.width;
      const canvas = document.createElement("canvas");
      canvas.width = MAX_WIDTH;
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          const resized = new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
            type: "image/jpeg",
          });
          resolve(resized);
        },
        "image/jpeg",
        QUALITY,
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}
