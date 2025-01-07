import * as React from "react"
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const HeartUnfilledIcon = (props: ImageProps) => (
  <Svg
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        stroke="#272727"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.727 7.315c.586.66.94 1.526.94 2.48 0 4.666-4.32 7.42-6.254 8.086-.226.08-.6.08-.826 0-1.934-.666-6.254-3.42-6.254-8.086 0-2.06 1.66-3.727 3.707-3.727 1.213 0 2.287.587 2.96 1.493a3.688 3.688 0 0 1 2.96-1.493"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default HeartUnfilledIcon
