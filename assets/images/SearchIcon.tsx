import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"

const SearchIcon = (props:ImageProps) => (
  <Svg
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#272727"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7.667 1.333A6.33 6.33 0 0 1 14 7.667 6.33 6.33 0 0 1 7.667 14a6.33 6.33 0 0 1-6.334-6.333c0-2.467 1.407-4.6 3.467-5.647m9.867 12.647-1.334-1.334"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SearchIcon
