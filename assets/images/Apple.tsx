import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"
const AppleIcon = (props: ImageProps) => (
  <Svg
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#272727"
        d="M19.798 8.594c-1.638 1.013-2.65 2.749-2.65 4.677 0 2.17 1.3 4.147 3.277 4.967a12.883 12.883 0 0 1-1.687 3.471c-1.06 1.495-2.169 3.038-3.807 3.038-1.639 0-2.12-.965-4.049-.965-1.88 0-2.554 1.013-4.096 1.013-1.542 0-2.602-1.398-3.807-3.134-1.59-2.41-2.506-5.207-2.554-8.149 0-4.773 3.084-7.328 6.168-7.328 1.639 0 2.988 1.06 4 1.06.964 0 2.506-1.109 4.338-1.109a5.753 5.753 0 0 1 4.867 2.46ZM14.063 4.11c.82-.964 1.253-2.17 1.301-3.423 0-.145 0-.338-.048-.482a5.54 5.54 0 0 0-3.614 1.88 5.264 5.264 0 0 0-1.35 3.327c0 .145 0 .29.048.434.097 0 .241.048.338.048 1.301-.096 2.506-.771 3.325-1.784Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.425.205h20v24.59h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default AppleIcon
