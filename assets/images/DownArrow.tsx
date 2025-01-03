import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"
const DownArrow = (props: ImageProps) => (
    <Svg
        fill="none"
        viewBox="0 0 18 18"
        {...props}
    >
        <Path
            stroke="#272727"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="m10.673 8.567-1.746 1.746a1.324 1.324 0 0 1-1.867 0L2.72 5.967m10.56 0-.693.693"
        />
    </Svg>
)
export default DownArrow
