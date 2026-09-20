"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * WebGL failures (unsupported context, a bad asset, a driver crash) otherwise
 * surface as a silent black canvas. Show something readable instead.
 */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[GuitarScene] failed to render:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="absolute inset-0 grid place-items-center bg-void px-6">
          <div className="max-w-sm text-center">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-ember-400">
              Scene unavailable
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The 3D view could not start. This usually means WebGL is disabled
              or unsupported in this browser.
            </p>
            <p className="mt-3 font-mono text-[0.7rem] text-muted/60">
              {this.state.error.message}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
