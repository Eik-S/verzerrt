import { css } from '@emotion/react'

export function Description({ ...props }) {
  return (
    <div css={styles.wrapper} {...props}>
      <h1 css={styles.headline}>Von der Statistik abweichende Bericht&shy;erstattung</h1>
      <p css={styles.text}>
        Online-Zeitungen sammeln Kartoffelpunkte wenn ihre Berichterstattung über Personengruppen
        von deren gesellschaftlichem Anteil abweicht.
      </p>
      ---
      <p css={styles.text}>
        Warp gangway Jolly Roger crimp Letter of Marque cackle fruit knave blow the man down long
        clothes swab. Transom warp Pirate Round handsomely Pieces of Eight prow bowsprit clipper aye
        bring a spring upon her cable. Man-of-war tackle wench draught yo-ho-ho Blimey crow's nest
        lass chandler bounty. Lugger boatswain yo-ho-ho lee lass ye boom starboard keel gunwalls.
        Prow gangplank fire in the hole jib trysail piracy scallywag dead men tell no tales haul
        wind furl. Spanish Main Jack Tar weigh anchor topgallant lugsail run a rig tack reef bilge
        water matey. Shiver me timbers wherry scuppers sutler squiffy yardarm bring a spring upon
        her cable Nelsons folly no prey, no pay brigantine. Boatswain Corsair tack take a caulk hulk
        prow Cat o'nine tails hail-shot long boat Jack Tar. Cable overhaul Plate Fleet spike
        broadside brig grog blossom clipper aye loaded to the gunwalls.
      </p>

      ---

      <p css={styles.contact}>
        Contact: <a href="mailto:post@kartoffelindex.de">post@kartoffelindex.de</a>
      </p>
    </div>
  )
}

const styles = {
  wrapper: css`
    padding: 0 48px;
    width: 400px;
  `,
  headline: css`
    font-size: 36px;
    word-wrap: break-word;
    hyphens: manual;
  `,
  text: css`
    font-size: 18px;
    letter-spacing: 0.04em;
  `,
  contact: css`
    font-size: 14px;
    color: #888;
    a {
      text-decoration: none;
      color: inherit;
    }
  `,
}
