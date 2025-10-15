import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import {
	Dropzone,
	DropzoneContent,
	DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";

type DialogReceiptViewProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (event: React.FormEvent) => void;
	onDrop: (acceptedFiles: File[]) => void;
	files?: File[];
	filePreview?: string;
	isSubmitting?: boolean;
	onError?: (error: unknown) => void;
};

export default function DialogReceiptView({
	open,
	onOpenChange,
	onSubmit,
	onDrop,
	files,
	filePreview,
	isSubmitting,
	onError,
}: DialogReceiptViewProps) {
	return (
		<div className="flex justify-center">
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogTrigger asChild>
					<Button variant="outline">
						<Plus className="mr-2 h-4 w-4" />
						Novo recibo
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<form onSubmit={onSubmit}>
						<DialogHeader>
							<DialogTitle>Adicione um novo recibo ou nota fiscal</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<Dropzone
								accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
								onDrop={onDrop}
								onError={onError}
								src={files}
							>
								<DropzoneEmptyState />
								<DropzoneContent>
									{filePreview && (
										<div className="h-[102px] w-full">
											<img
												alt="Preview"
												className="absolute top-0 left-0 h-full w-full object-cover"
												src={filePreview}
											/>
										</div>
									)}
								</DropzoneContent>
							</Dropzone>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" disabled={!files || isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Saving…
									</>
								) : (
									"Save changes"
								)}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
