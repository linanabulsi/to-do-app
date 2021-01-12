import { Flex, Text } from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import todosData from "../../data/todos.json";

export const PieChart = () => {
  const data = todosData.todos;
  const normalValues = data.filter((data) => data.severity === "Normal").length;
  const importantValues = data.filter((data) => data.severity === "Important")
    .length;
  const urgentValues = data.filter((data) => data.severity === "Urgent").length;

  const pieChartData = [
    {
      id: "Normal",
      label: "Normal",
      value: normalValues,
      color: "hsl(129, 70%, 50%)",
    },
    {
      id: "Important",
      label: "Important",
      value: importantValues,
      color: "hsl(65, 70%, 50%)",
    },
    {
      id: "Urgent",
      label: "Urgent",
      value: urgentValues,
      color: "hsl(135, 70%, 50%)",
    },
  ];

  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      p={6}
      h="500px"
    >
      <Text fontWeight="bold" fontSize={20}>
        Pie Chart
      </Text>
      <ResponsivePie
        data={pieChartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
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
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Normal",
            },
            id: "dots",
          },
          {
            match: {
              id: "Urgent",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Flex>
  );
};
