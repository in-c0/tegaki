'use client';

import { Dithering, GrainGradient, HalftoneDots } from '@paper-design/shaders-react';
import { clampTuning, MATERIAL_PRESETS, type MaterialKind, type MaterialTuning } from './material-presets.ts';

export interface MaterialShaderRendererProps {
  kind: MaterialKind;
  tuning?: MaterialTuning;
  image?: string;
  paused?: boolean;
}

/** Keeps shader vendor APIs in one replaceable adapter. */
export function MaterialShaderRenderer({ kind, tuning = {}, image, paused = false }: MaterialShaderRendererProps) {
  const preset = MATERIAL_PRESETS[kind];
  const base = {
    width: '100%',
    height: '100%',
    maxPixelCount: 1_200_000,
    style: { width: '100%', height: '100%' },
  } as const;

  if (preset.family === 'gradient') {
    return (
      <GrainGradient
        {...base}
        colors={[...preset.colors]}
        colorBack={preset.colorBack}
        softness={preset.softness}
        intensity={clampTuning(tuning.intensity ?? preset.intensity, 0, 1)}
        noise={clampTuning(tuning.noise ?? preset.noise, 0, 1)}
        shape={preset.shape}
        speed={paused ? 0 : clampTuning(tuning.speed ?? preset.speed, 0, 2)}
        scale={clampTuning(tuning.scale ?? preset.scale, 0.2, 3)}
        rotation={preset.rotation}
        offsetX={preset.offsetX}
        offsetY={preset.offsetY}
      />
    );
  }

  if (preset.family === 'dithering') {
    return (
      <Dithering
        {...base}
        colorBack={preset.colorBack}
        colorFront={preset.colorFront}
        shape={preset.shape}
        type={preset.type}
        size={clampTuning(tuning.size ?? preset.size, 1, 20)}
        speed={paused ? 0 : clampTuning(tuning.speed ?? preset.speed, 0, 2)}
        scale={clampTuning(tuning.scale ?? preset.scale, 0.2, 3)}
        rotation={preset.rotation}
        offsetX={preset.offsetX}
        offsetY={preset.offsetY}
      />
    );
  }

  return (
    <HalftoneDots
      {...base}
      image={image || '/halftone-study.svg'}
      colorBack={preset.colorBack}
      colorFront={preset.colorFront}
      originalColors={preset.originalColors}
      type={preset.type}
      grid={preset.grid}
      inverted={preset.inverted}
      size={clampTuning(tuning.size ?? preset.size, 0, 1)}
      radius={preset.radius}
      contrast={clampTuning(tuning.contrast ?? preset.contrast, 0, 1)}
      grainMixer={preset.grainMixer}
      grainOverlay={preset.grainOverlay}
      grainSize={preset.grainSize}
      scale={clampTuning(tuning.scale ?? preset.scale, 0.2, 3)}
      fit={preset.fit}
    />
  );
}
