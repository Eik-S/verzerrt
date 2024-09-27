import { BarChartData, TimeSeriesData } from '../models/StoryData'

export function transformTimeSeriesToBarChartData(
  timeSeriesData: TimeSeriesData[],
): BarChartData[] {
  return timeSeriesData.map((entry) => {
    const barChartData: BarChartData = {
      name: entry.name,
      score: entry.scores.reduce((prev, curr) => prev + curr.score, 0),
    }

    return barChartData
  })
}
