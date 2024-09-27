/**
 * Data format of s3 bucket JSON results.
 *
 * Each day a new score is appended to the scores array.
 */
export interface TimeSeriesData {
  /**
   * The name of the publisher
   */
  name: string
  scores: { date: Date; score: number }[]
}

/**
 * Date format for bar charts displaying the total scores.
 *
 * Can be created from {@link TimeSeriesData} by using `transformTimeSeriesToBarChartData`
 */
export interface BarChartData {
  name: string
  score: number
}
