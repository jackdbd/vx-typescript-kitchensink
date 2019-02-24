// Type definitions for @vx/drag 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/drag" {
  import React from "react";

  interface IItem {
    id: number;
    radius: number;
    x: number;
    y: number;
  }

  type EventHandler = (event: React.MouseEvent | React.TouchEvent) => void;

  interface IDragStartProps {
    dx: number;
    dy: number;
    event: any;
    isDragging: boolean;
    x: number;
    y: number;
  }

  interface IDragMoveProps {
    dx: number;
    dy: number;
    event: any;
    isDragging: boolean;
    x: number;
    y: number;
  }

  interface IDragProps {
    dragEnd: EventHandler;
    dragMove: EventHandler;
    dragStart: EventHandler;
    dx: number;
    dy: number;
    isDragging: boolean;
    x?: number;
    y?: number;
  }

  interface IProps {
    captureDragArea?: boolean;
    children: React.FunctionComponent<IDragProps>;
    height: number;
    onDragEnd?: EventHandler;
    onDragMove?: (props: IDragMoveProps) => void;
    onDragStart?: (props: IDragStartProps) => void;
    resetOnStart?: EventHandler | boolean;
    width: number;
  }

  const Drag: React.ComponentType<IProps>;
  const raise: (items: IItem[], raiseIndex: number) => IItem[];
}
