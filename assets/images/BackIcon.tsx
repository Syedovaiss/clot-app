import * as React from "react"
import Svg, {G, Rect, Path, Defs } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"

export const BackIcon = (props: ImageProps) => (
  <Svg
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect width={40} height={40} fill="#F4F4F4" rx={20} />
      <Path
        stroke="#272727"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="m19.46 17.293-1.747 1.747a1.324 1.324 0 0 0 0 1.867l4.347 4.346m0-10.56-.693.694"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
