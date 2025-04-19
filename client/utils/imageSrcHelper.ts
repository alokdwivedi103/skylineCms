export const imageSrcHelper = (imageSrc: string) => {
  if (imageSrc.includes("imagekit.io/tools/asset-public-link")) {
    return JSON.parse(decodeURIComponent(imageSrc.split("detail=")[1]))
      .signedUrl;
  }
  return imageSrc;
};
