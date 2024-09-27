import { css } from '@emotion/react'
import { Chart } from '../components/chart'
import { Description } from '../components/description'

export function Home() {
  return (
    <div css={styles.homepage}>
      <Chart css={styles.chart} />
      <Description css={styles.description} />
    </div>
  )
}

const styles = {
  homepage: css`
    overflow: hidden;
    height: 100vh;
    background-color: blanchedalmond;

    display: flex;
    flex-direction: row;
    align-items: center;

    @media screen and (max-width: 850px){
      height: auto;
      min-height: 100vh;
      flex-direction: column;
      row-gap: 48px;
    }
  `,
  chart: css`
    flex-grow: 1;
    margin: auto;
  `,
  description: css`
    background-color: #001f3f;
    color: blanchedalmond;
    height: 100%;

    @media screen and (max-width: 850px){
      overflow-y: hidden;
      width: 100%;
    }
  `,
}
