import * as React from "react"
import Svg, {  Circle } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"
const MastercardIcon = (props: ImageProps) => (
  <Svg
    fill="none"
    {...props}
  >
    <Circle cx={8} cy={8} r={8} fill="#F4BD2F" />
    <Circle cx={16} cy={8} r={8} fill="#FA3636" />
  </Svg>
)
export default MastercardIcon
