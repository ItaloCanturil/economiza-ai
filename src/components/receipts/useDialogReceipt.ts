import { useCallback, useState } from "react";

export function useDialogReceipt() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDrop = useCallback((droppedFiles: File[]) => {
    setFiles(droppedFiles);
    if (droppedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target.result);
        }
      };
      reader.readAsDataURL(droppedFiles[0]);
    }
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form submitted");
      setIsSubmitting(false);
      setOpen(false);
    }, 1500);
  }, [isSubmitting]);

  const handleError = useCallback((error: unknown) => {
    console.error(error);
  }, []);

  return {
    open,
    setOpen,
    files,
    filePreview,
    isSubmitting,
    handleDrop,
    handleSubmit,
    handleError,
  };
}