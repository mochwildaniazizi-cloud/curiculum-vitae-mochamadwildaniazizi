'use client';

import dynamic from 'next/dynamic';

// ssr: false hanya boleh dipakai di Client Component
const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), {
  ssr: false,
});

export default function ParticleCanvasWrapper() {
  return <ParticleCanvas />;
}
