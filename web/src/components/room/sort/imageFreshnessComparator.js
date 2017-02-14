export default (a, b) => {
  if (a.image && b.image) {
    return compareImage(a.image, b.image);
  }
  if (a.image && !b.image) {
    return -1;
  }
  if (!a.image && b.image) {
    return 1;
  }
  return 0;
};

const compareImage = (image1, image2) => {
  if (image1.timestamp < image2.timestamp) {
    return 1;
  }
  if (image1.timestamp > image2.timestamp) {
    return -1;
  }
  return 0;
};
