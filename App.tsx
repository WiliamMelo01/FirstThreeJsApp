import { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import Shoe from './src/components/Shoe';

export default function App() {
  return (
      <Canvas>
      <pointLight position={[10,0,10]} />
      <Suspense fallback={null}>
        <Shoe />
      </Suspense>
      </Canvas>
    
  );
}