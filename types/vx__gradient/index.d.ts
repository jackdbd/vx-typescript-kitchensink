// Type definitions for @vx/gradient 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/gradient" {
  interface SharedProps {
    from?: string;
    fromOffset?: string;
    fromOpacity?: number;
    id: string;
    rotate?: string | number;
    to?: string;
    toOffset?: string;
    toOpacity?: number;
    transform?: string;
  }

  interface LinearGradientProps extends SharedProps {
    vertical?: boolean;
    x1?: string;
    y1?: string;
    y2?: string;
  }

  type GradientProps = Pick<
    LinearGradientProps,
    | "id"
    | "x1"
    | "y1"
    | "y2"
    | "fromOffset"
    | "fromOpacity"
    | "toOffset"
    | "toOpacity"
    | "rotate"
    | "transform"
    | "vertical"
  >;

  interface RadialGradientProps extends SharedProps {
    r: string | number;
  }

  const LinearGradient: React.ComponentType<LinearGradientProps>;
  const RadialGradient: React.ComponentType<RadialGradientProps>;

  const GradientDarkgreenGreen: React.ComponentType<GradientProps>;
  const GradientLightgreenGreen: React.ComponentType<GradientProps>;
  const GradientOrangeRed: React.ComponentType<GradientProps>;
  const GradientPinkBlue: React.ComponentType<GradientProps>;
  const GradientPinkRed: React.ComponentType<GradientProps>;
  const GradientPurpleOrange: React.ComponentType<GradientProps>;
  const GradientPurpleRed: React.ComponentType<GradientProps>;
  const GradientPurpleTeal: React.ComponentType<GradientProps>;
  const GradientSteelPurple: React.ComponentType<GradientProps>;
  const GradientTealBlue: React.ComponentType<GradientProps>;
}
