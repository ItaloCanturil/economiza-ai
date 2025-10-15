import DialogReceiptView from "./DialogReceiptView";
import { useDialogReceipt } from "./useDialogReceipt";

export default function DialogReceiptContainer() {
  const {
    open,
    setOpen,
    files,
    filePreview,
    isSubmitting,
    handleDrop,
    handleSubmit,
    handleError,
  } = useDialogReceipt();

  return (
    <DialogReceiptView
      open={open}
      onOpenChange={setOpen}
      onSubmit={handleSubmit}
      onDrop={handleDrop}
      files={files}
      filePreview={filePreview}
      isSubmitting={isSubmitting}
      onError={handleError}
    />
  );
}
