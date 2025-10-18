import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table as TableEl,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

type DataTableViewProps<Payment> = {
	table: Table<Payment>;
};

export default function DataTableView<Payment>({
	table,
}: DataTableViewProps<Payment>) {
	console.log("🚀 ~ DataTableView ~ table:", table);
	return (
		<div className="w-full p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filtrar gastos..."
					value={(table.getColumn("amount")?.getFilterValue() as string) ?? ""}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						table.getColumn("amount")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value: boolean) =>
											column.toggleVisibility(value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="overflow-hidden rounded-md border">
				<TableEl>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: header.column.columnDef.header &&
												  table.options.meta?.flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{table.options.meta?.flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={table.getAllColumns().length}
									className="h-24 text-center"
								>
									<div className="flex flex-col items-center justify-center gap-2">
										<p className="text-lg font-medium">
											Nenhum dado encontrado
										</p>
										<p className="text-sm text-muted-foreground">
											Não há registros para exibir no momento.
										</p>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</TableEl>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="text-muted-foreground flex-1 text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
