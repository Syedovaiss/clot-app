import { ProfileProps } from "../profile/ProfileScreen";

export type TabNavigatorStackProps = {
    HomeScreen: undefined;
    CartScreen: undefined;
    ProfileScreen: ProfileProps;
    AboutScreen: { paramData: string | null } | undefined;
  };