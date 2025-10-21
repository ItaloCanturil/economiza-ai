import DialogRecipeView from "./DialogRecipeView";
import { useDialogRecipe } from "./useDialogRecipe";

export default function DialogRecipeContainer() {
	const {
		open,
		setOpen,
		isSubmitting,
		handleSubmit,
		incomeAmount,
		setIncomeAmount,
	} = useDialogRecipe();

	return (
		<DialogRecipeView
			open={open}
			onOpenChange={setOpen}
			onSubmit={handleSubmit}
			onDrop={() => {}}
			isSubmitting={isSubmitting}
			incomeAmount={incomeAmount}
			onIncomeChange={setIncomeAmount}
		/>
	);
}
