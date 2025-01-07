import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"
const RightArrow = (props: ImageProps) => (
  <Svg
    fill="none"
    {...props}
  >
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m12.9 7.94 2.62 2.62c.77.77.77 2.03 0 2.8L9 19.87M9 4.04l1.04 1.04"
    />
  </Svg>
)
export default RightArrow
