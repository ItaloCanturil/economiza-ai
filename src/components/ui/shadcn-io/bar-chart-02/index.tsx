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

export const description = "Analytics";

const calculateMonthTotal = (monthData: any): number => {
	const categories = Object.keys(chartConfig).filter((key) => key !== "all");
	return categories.reduce(
		(sum, category) => sum + (monthData[category] || 0),
		0
	);
};

const chartData = [
	{
		month: "Jan",
		food: 320,
		transport: 120,
		utilities: 150,
		entertainment: 80,
		get all() {
			return calculateMonthTotal(this);
		},
	},
	{
		month: "Feb",
		food: 280,
		transport: 100,
		utilities: 160,
		entertainment: 60,
		get all() {
			return calculateMonthTotal(this);
		},
	},
	{
		month: "Mar",
		food: 350,
		transport: 130,
		utilities: 140,
		entertainment: 90,
		get all() {
			return calculateMonthTotal(this);
		},
	},
	{
		month: "Apr",
		food: 300,
		transport: 110,
		utilities: 170,
		entertainment: 70,
		get all() {
			return calculateMonthTotal(this);
		},
	},
	{
		month: "May",
		food: 330,
		transport: 125,
		utilities: 155,
		entertainment: 95,
		get all() {
			return calculateMonthTotal(this);
		},
	},
	{
		month: "Jun",
		food: 310,
		transport: 115,
		utilities: 165,
		entertainment: 85,
		get all() {
			return calculateMonthTotal(this);
		},
	},
];

const chartConfig = {
	food: { label: "Food", color: "var(--chart-1)" },
	transport: { label: "Transport", color: "var(--chart-2)" },
	utilities: { label: "Utilities", color: "var(--chart-3)" },
	entertainment: { label: "Entertainment", color: "var(--chart-4)" },
	all: { label: "All", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function ChartBarDefault() {
	const [selectedCategory, setSelectedCategory] = useState<string>("food");

	return (
		<div className="w-full h-full flex flex-col p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg">
			<div className="flex justify-between">
				<div className="flex flex-col gap-1 pb-4 mb-4 border-b">
					<h3 className="text-lg font-semibold">Analytics by category</h3>
					<p className="text-sm text-muted-foreground">January - June 2024</p>
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
							tickFormatter={(value) => value.slice(0, 3)}
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
			{/* <div className="flex flex-col items-start gap-2 text-sm pt-4 border-t">
				<div className="flex gap-2 leading-none font-medium">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground leading-none">
					Showing total visitors for the last 6 months
				</div>
			</div> */}
		</div>
	);
}
