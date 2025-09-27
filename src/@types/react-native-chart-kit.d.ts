declare module "react-native-chart-kit" {
  import * as React from "react";
  import { ViewStyle, StyleProp } from "react-native";

  // Chart config for all charts
  export interface ChartConfig {
    backgroundGradientFrom?: string;
    backgroundGradientTo?: string;
    backgroundGradientFromOpacity?: number;
    backgroundGradientToOpacity?: number;
    color?: (opacity?: number) => string;
    labelColor?: (opacity?: number) => string;
    decimalPlaces?: number;
    style?: StyleProp<ViewStyle>;
  }

  // Dataset for bar/pie/line charts
  export interface Dataset {
    data: number[];
    color?: (opacity?: number) => string;
    colors?: ((opacity?: number) => string)[]; 
  }

  export interface ChartData {
    labels: string[];
    datasets: Dataset[];
  }

  // Props for BarChart
  export interface BarChartProps {
    data: ChartData;
    width: number;
    height: number;
    chartConfig: ChartConfig;
    style?: StyleProp<ViewStyle>;
    fromZero?: boolean;
    showValuesOnTopOfBars?: boolean;
    flatColor?: boolean;
    withCustomBarColorFromData?: boolean;
  }

  export class BarChart extends React.Component<BarChartProps> {}
}
