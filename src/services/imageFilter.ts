import toast from "react-hot-toast";

export function imageFilter(files: FileList) {
  const file = files[0];

  if (!file.type.startsWith("image/")) {
    toast.error("You can upload only images");
    return false;
  }

  if (files.length > 1) {
    toast.error("You can upload only one file");
    return false;
  }
  return true;
}
