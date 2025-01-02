import { SvgProps } from "react-native-svg";

export type ImageProps = SvgProps & {
    width: Number,
    height: Number,
    color?:string
}