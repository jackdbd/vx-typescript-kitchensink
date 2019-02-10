// Type definitions for @vx/curve 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/curve" {
  type Curve = () => void;

  function curveBasis(): Curve;
  function curveBasisClose(): Curve;
  function curveBasisOpen(): Curve;
  function curveBundle(): Curve;
  function curveCardinal(): Curve;
  function curveCardinalClosed(): Curve;
  function curveCardinalOpen(): Curve;
  function curveCatmullRom(): Curve;
  function curveCatmullRomClosed(): Curve;
  function curveCatmullRomOpen(): Curverve;
  function curveLinear(): Curve;
  function curveLinearClosed(): Curve;
  function curveMonotoneX(): Curve;
  function curveMonotoneY(): Curve;
  function curveNatural(): Curve;
  function curveStep(): Curve;
  function curveStepAfter(): Curve;
  function curveStepBefore(): Curve;
}
