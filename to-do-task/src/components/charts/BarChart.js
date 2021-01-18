import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Flex, Text } from "@chakra-ui/react";
import { TodoContext } from "../../App";

export default function BarChart() {
  const [data] = React.useContext(TodoContext);

  const unique = [...new Set(data.map((item) => item.date))];
  const barChartData = [];

  unique.map((date) => {
    const values = {
      date,
      to_do: 0,
      in_progress: 0,
      done: 0,
    };
    data.filter((data) => {
      data.date === date && values[data.progress]++;
    });
    barChartData.push(values);
  });

  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      p={6}
      h="500px"
    >
      <Text fontWeight="bold" fontSize={20}>
        Bar Chart
      </Text>
      <ResponsiveBar
        data={barChartData}
        keys={["to_do", "in_progress", "done"]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "in_progress",
            },
            id: "dots",
          },
          {
            match: {
              id: "done",
            },
            id: "lines",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "date",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "progress",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </Flex>
  );
}
