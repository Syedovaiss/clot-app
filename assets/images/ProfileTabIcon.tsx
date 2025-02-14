import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { ImageProps } from "../../src/config/image_config/ImageProps"
const ProfileTabIcon = (props: ImageProps) => (
  <Svg
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M15.68 3.96c.48.71.76 1.56.76 2.48-.01 2.4-1.9 4.35-4.28 4.43-.1-.01-.22-.01-.33 0-2.21-.07-4-1.76-4.24-3.92C7.3 4.38 9.41 2 11.99 2m-5 12.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.73-1.83-7.24-1.83-10.01 0Z"
    />
  </Svg>
)
export default ProfileTabIcon