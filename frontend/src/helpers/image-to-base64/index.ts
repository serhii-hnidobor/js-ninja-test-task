export default function (file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result?.toString()?.split(',')[1]; // Extract the Base64-encoded string from the data URL
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert image to Base64'));
      }
    };

    reader.onerror = (event) => {
      reject(event.target?.error || new Error('Error occurred while converting image to Base64'));
    };

    reader.readAsDataURL(file);
  });
}
