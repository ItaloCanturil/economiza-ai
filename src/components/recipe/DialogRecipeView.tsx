import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "../ui/input";

export default function DialogRecipeView({
	open,
	onOpenChange,
	onSubmit,
	isSubmitting,
	incomeAmount,
	onIncomeChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (event: React.FormEvent) => void;
	onDrop: (acceptedFiles: File[]) => void;
	isSubmitting?: boolean;
	incomeAmount?: number;
	onIncomeChange: (value: number | undefined) => void;
}) {
	return (
		<div className="flex justify-center">
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogTrigger asChild>
					<Button className="text-white flex items-center rounded-xl">
						<Plus className="h-4 w-4 sm:mr-2" />
						<span className="hidden sm:inline">Nova receita</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[500px]">
					<form onSubmit={onSubmit}>
						<div className="grid gap-4 py-4">
							{/* Income input */}
							<div className="grid gap-2">
								<label htmlFor="income-amount" className="text-sm font-medium">
									Valor da receita
								</label>
								<Input
									id="income-amount"
									type="number"
									min="0"
									step="0.01"
									placeholder="Ex: 1500,00"
									value={incomeAmount ?? ""}
									onChange={(e) => {
										const v = e.target.value;
										const parsed = v === "" ? undefined : Number.parseFloat(v);
										onIncomeChange(Number.isNaN(parsed) ? undefined : parsed);
									}}
								/>
							</div>
						</div>
						<DialogFooter>
							{/* <Button variant="outline">Adicionar de forma manual</Button> */}
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="submit"
								disabled={
									isSubmitting ||
									!incomeAmount ||
									Number.isNaN(incomeAmount) ||
									(incomeAmount ?? 0) <= 0
								}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Analisando...
									</>
								) : (
									"Adicionar"
								)}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
