// blob → File 변환 함수
const convertBlobToFile = async (src: string) => {
  const res = await fetch(src);
  const blob = await res.blob();
  const ext = blob.type.split("/")[1];
  return new File([blob], `image-${Date.now()}.${ext}`, {
    type: blob.type,
  });
};

/**
 * Quill content의 이미지 src 교체
 * @param contentHtml Quill content
 * @param convertBlobToFile 블롭 → File 변환 함수
 * @param uploadImage 이미지 업로드 함수
 */
export const convertEditorImages = async (
  contentHtml: string,
  onPostS3PresignedUrl: (files: File[]) => Promise<string[]>,
): Promise<string> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(contentHtml, "text/html");
  const imgElements = Array.from(doc.querySelectorAll("img"));

  for (const img of imgElements) {
    const src = img.getAttribute("src");
    if (src && (src.startsWith("blob:") || src.startsWith("data:"))) {
      const file = await convertBlobToFile(src);
      const uploadedUrl = await onPostS3PresignedUrl([file]);
      if (uploadedUrl) img.setAttribute("src", uploadedUrl[0]);
    }
  }
  return doc.body.innerHTML;
};

/**
 * 파일 변경 핸들러
 * @param e 파일 변경 이벤트
 * @param setErrorMessage 에러 메시지 설정 함수
 */
export const validateFileSize = (
  e: React.ChangeEvent<HTMLInputElement>,
): { validFiles: File[]; invalidFiles: File[] } => {
  const files = e.target.files;
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  if (!files || files.length === 0) {
    return { validFiles: [], invalidFiles: [] };
  }

  const updatedFiles = Array.from(files);
  const validFiles = updatedFiles.filter((file) => file.size <= MAX_SIZE);
  const invalidFiles = updatedFiles.filter((file) => file.size > MAX_SIZE);

  return { validFiles, invalidFiles };
};
