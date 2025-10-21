"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useDashboard } from "@/contexts/dashboard-context";

export const description = "Analytics";

const chartConfig = {
	food: { label: "Food", color: "var(--chart-1)" },
	transport: { label: "Transport", color: "var(--chart-2)" },
	utilities: { label: "Utilities", color: "var(--chart-3)" },
	entertainment: { label: "Entertainment", color: "var(--chart-4)" },
	all: { label: "All", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function ChartBarDefault() {
	const [selectedCategory, setSelectedCategory] = useState<string>("food");
	const { chartData } = useDashboard();

	return (
		<div className="w-full h-full flex flex-col p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg">
			<div className="flex justify-between">
				<div className="flex flex-col gap-1 pb-4 mb-4 border-b">
					<h3 className="text-lg font-semibold">Analytics by category</h3>
					<p className="text-sm text-muted-foreground">Last months</p>
				</div>

				<Select value={selectedCategory} onValueChange={setSelectedCategory}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent>
						{Object.keys(chartConfig).map((key) => (
							<SelectItem key={key} value={key}>
								{chartConfig[key as keyof typeof chartConfig]?.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex-1 flex items-center justify-center min-h-0">
				<ChartContainer config={chartConfig} className="h-[250px] w-full">
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => String(value).slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar
							dataKey={selectedCategory}
							fill={
								chartConfig[selectedCategory as keyof typeof chartConfig]?.color
							}
							radius={8}
						/>
					</BarChart>
				</ChartContainer>
			</div>
		</div>
	);
}
