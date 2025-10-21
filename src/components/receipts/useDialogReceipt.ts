import { useCallback, useState } from "react";
import { useDashboard } from "../../contexts/dashboard-context";

export function useDialogReceipt() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const { analyzeReceipt, isAnalyzing } = useDashboard();

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setFiles(undefined);
      setFilePreview(undefined);
    }
  }, []);

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

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (isAnalyzing) return;
      const file = files?.[0];
      if (!file) return;
      try {
        await analyzeReceipt(file);
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    },
    [isAnalyzing, files, analyzeReceipt]
  );

  const handleError = useCallback((error: unknown) => {
    console.error(error);
  }, []);

  return {
    open,
    setOpen: handleOpenChange,
    files,
    filePreview,
    isSubmitting: isAnalyzing,
    handleDrop,
    handleSubmit,
    handleError,
  };
}