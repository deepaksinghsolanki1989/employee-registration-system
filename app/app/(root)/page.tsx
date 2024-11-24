"use client";

import { useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-11-21", users: 1, paintingJobs: 2 },
  { date: "2024-11-22", users: 12, paintingJobs: 0 },
  { date: "2024-11-24", users: 0, paintingJobs: 1 },
];

const chartConfig = {
  views: {
    label: "Record Created",
  },
  users: {
    label: "Employee",
    color: "hsl(var(--chart-1))",
  },
  paintingJobs: {
    label: "Painting Jobs",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Dashboard = () => {
  // const [title, setTitle] = useState("");
  // const [title, settitle] = useState("");

  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("users");

  const total = useMemo(
    () => ({
      users: chartData.reduce((acc, curr) => acc + curr.users, 0),
      paintingJobs: chartData.reduce((acc, curr) => acc + curr.paintingJobs, 0),
    }),
    []
  );

  return (
    <div className="dashboard-container">
      <section>
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>
                {" "}
                {activeChart === "users"
                  ? "Total employees"
                  : "Total printing jobs"}
              </CardTitle>
              <CardDescription>
                {activeChart === "users"
                  ? "Showing total employees signup"
                  : "Showing total printing jobs created"}
              </CardDescription>
            </div>
            <div className="flex">
              {["users", "paintingJobs"].map((key) => {
                const chart = key as keyof typeof chartConfig;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
                    </span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  dataKey={activeChart}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
