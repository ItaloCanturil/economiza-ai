import { useCallback, useState } from "react";
import { useDashboard } from "@/contexts/dashboard-context";

export function useDialogRecipe() {
  const [open, setOpen] = useState(false);
  const { addIncome } = useDashboard();
  const [incomeAmount, setIncomeAmount] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setIncomeAmount(undefined);
    }
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (incomeAmount && incomeAmount > 0) {
        console.log("🚀 ~ useDialogRecipe ~ incomeAmount:", incomeAmount)
        addIncome(incomeAmount);
      }
      setOpen(false);
      setIncomeAmount(undefined);
    } finally {
      setIsSubmitting(false);
    }
  }, [incomeAmount, addIncome]);


  return {
    open,
    setOpen: handleOpenChange,
    isSubmitting,
    handleSubmit,
    incomeAmount,
    setIncomeAmount,
  };
}