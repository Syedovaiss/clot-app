import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"
const CartIcon = (props: ImageProps) => (
  <Svg
    fill="none"
        viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5 5.113v-.646c0-1.5 1.207-2.974 2.707-3.114A3 3 0 0 1 11 4.34v.92m-8.46 5.78.153 1.247c.147 1.306.627 2.38 3.307 2.38h4c2.68 0 3.16-1.074 3.3-2.38l.5-4c.18-1.627-.287-2.954-3.133-2.954H5.333C2.487 5.333 2.02 6.66 2.2 8.287"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.33 8h.006M5.663 8h.006"
    />
  </Svg>
)
export default CartIcon
