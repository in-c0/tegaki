# Paper UI — material-aware interface primitives

A small, experimental React component package added to the owner's Tegaki fork. The goal is a quiet paper-and-graphite design language suitable for Whispers and other creative web applications.

## Design baseline

- Warm desk lighting, low-saturation interfaces, paper texture, real stroke-order handwriting, gentle affordances.
- A functional DOM first. Canvas shader only on deliberately selected large surfaces.
- No simulated paper folding, deformable cloth physics, true dynamic point-light rendering, or realistic graphite reflectance is claimed.
- Optional visual treatment must not compromise accessibility or content legibility.

## Components

- PaperSurface: CSS fallback, Paper Shaders texture, fixed lighting direction, two tones. Its texture is isolated from interactive children.
- PaperCard: lightweight CSS lift/settle feedback with reduced-motion support.
- PaperButton: native accessible button states and reduced-motion support.
- PencilText: Tegaki React wrapper with selectable bundles, animation mode, reduced-motion preference and ink colour.
- WHISPERS_PAPER_PRESET: verbatim user-selected Paper Shader settings.

## Development

From the repository root:

    bun install
    bun --filter @in-c0/paper-ui typecheck
    bun --filter @in-c0/paper-ui test
    bun --filter @in-c0/example-paper-ui dev
    bun --filter @in-c0/example-paper-ui build

This package is intentionally private and source-exported until CI, browser tests, packaging and API stability are verified. Do not publish it under the original Tegaki package name.

## Example

    import { PaperSurface, PaperCard, PencilText } from '@in-c0/paper-ui';
    import korean from 'tegaki/fonts/nanum-pen-script';

    function Scene() {
      return (
        <PaperSurface light="desk">
          <PaperCard>
            <PencilText font={korean}>조금씩, 꾸준히.</PencilText>
          </PaperCard>
        </PaperSurface>
      );
    }

PaperSurface is a background material, not a physically bendable object. Paper Shaders' angle controls the direction of shading on its generated wrinkles and texture. It does not calculate shadows from other interactive DOM elements.

## Third-party rights and security

- Tegaki: MIT (upstream owned by its original author).
- Paper Shaders: Apache-2.0; imported as a separate version-pinned runtime package, not vendored.
- Keep upstream copyright notices and all original licenses intact.
- The shader dependency is pinned to 0.0.81 because its authors warn that breaking changes may ship under the 0.0.x series.
- The branch only adds new workspaces; original renderer behavior is not changed.

## Performance and next verification

The canvas shader is a visual enhancement. PaperSurface avoids server-side rendering of WebGL content, caps shader pixels at 2 million, and keeps readable CSS when graphics are unavailable. Do not put a PaperSurface with texture enabled inside every tile in an infinite gallery.

Next tests: install + typecheck, browser GPU fallback, resize behavior, screenshot comparison, keyboard navigation, reduced motion, and low-end mobile frame budget. The demo is illustrative, not production certification.
