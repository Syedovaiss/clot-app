import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"
const OrderIcon = (props: ImageProps) => (
  <Svg
    fill="none"
    {...props}
  >
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M28.5 15.04c0-4.03-.94-5.04-4.72-5.04h-7.56c-3.78 0-4.72 1.01-4.72 5.04V26.3c0 2.66 1.46 3.29 3.23 1.39l.01-.01c.82-.87 2.07-.8 2.78.15l1.01 1.35c.81 1.07 2.12 1.07 2.93 0l1.01-1.35c.72-.96 1.97-1.03 2.79-.15 1.78 1.9 3.23 1.27 3.23-1.39V19M16 15h8m-7 4h6"
    />
  </Svg>
)
export default OrderIcon
