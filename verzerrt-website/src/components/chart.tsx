import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import { getLogoPath } from './publishers'
import { css } from '@emotion/react'
import { BarChartData, TimeSeriesData } from '../models/StoryData'
import { transformTimeSeriesToBarChartData } from '../utils/data-transform'

export function Chart({ ...props }) {
  const margin = { top: 20, right: 70, bottom: 40, left: 90 }
  const [width, setWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined
    setWidth((document.querySelector('#chart')?.clientWidth || 400) - margin.left - margin.right)
    window.onresize = () => {
      timeout && clearTimeout(timeout)
      timeout = setTimeout(
        () =>
          setWidth(
            (document.querySelector('#chart')?.clientWidth || 400) - margin.left - margin.right,
          ),
        10,
      )
    }
  }, [margin.left, margin.right])

  useEffect(() => {
    if (width === undefined) {
      return
    }

    // set the dimensions and margins of the graph
    const height = 400 - margin.top - margin.bottom
    const svg = d3
      .select('#chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    async function initChart() {
      console.log('initializing chart')

      // append the svg object to the body of the page

      // Parse the Data
      const data = transformTimeSeriesToBarChartData(
        (await d3.json('/test-data.json')) as TimeSeriesData[],
      )
      const xScale = 100
      const xMax = data.sort((a, b) => b.score - a.score)[0].score

      var x = d3
        .scaleLinear()
        .domain([0, xMax * xScale])
        .range([0, width!])
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .attr('style', styles.xFont.styles)

      // Y axis
      var y = d3
        .scaleBand()
        .range([0, height])
        .domain(
          data.map(function (d) {
            return d.name
          }),
        )
        .padding(0.3)
      svg.append('g').call(d3.axisLeft(y)).selectAll('text').attr('style', styles.yFont.styles)

      //Bars
      svg
        .selectAll('chartBar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', x(0))
        .attr('y', (d) => y(`${d.name}`) as number)
        .attr('width', function (d) {
          return x(d.score) * xScale
        })
        .attr('height', y.bandwidth())
        .attr('style', styles.bar.styles)

      svg
        .selectAll('chartBar')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(d.score) * xScale)
        .attr('cy', (d) => ((y(`${d.name}`) as number) + y.bandwidth() / 2) as number)
        .attr('r', y.bandwidth() / 2 - 2.5)
        .attr('style', styles.barTip.styles)

      const logoSize = (d: BarChartData) => y.bandwidth() * 0.6 * getPublisherScaling(d.name)
      svg
        .selectAll('chartBar')
        .data(data)
        .enter()
        .append('image')
        .attr('xlink:href', (d) => getLogoPath(d.name))
        .attr('x', (d) => x(d.score) * xScale - logoSize(d) / 2)
        .attr(
          'y',
          (d) => ((y(`${d.name}`) as number) + y.bandwidth() / 2 - logoSize(d) / 2) as number,
        )
        .attr('height', (d) => logoSize(d))
        .attr('width', (d) => logoSize(d))
    }

    initChart()

    return () => {
      console.log('cleaning chart')
      svg.remove()
    }
  }, [margin.bottom, margin.left, margin.right, margin.top, width])

  return <svg id="chart" {...props}></svg>
}

function getPublisherScaling(publisher: string) {
  if (publisher === 'bild') {
    return 0.8
  }
  return 1
}

const styles = {
  bar: css`
    fill: #69b3a2;
    position: relative;
  `,
  barTip: css`
    fill: blanchedalmond;
    stroke: #69b3a2;
    stroke-width: 5px;
  `,
  xFont: css`
    text-anchor: end;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
  `,
  yFont: css`
    text-anchor: end;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 500;
    font-size: 17px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  `,
}
