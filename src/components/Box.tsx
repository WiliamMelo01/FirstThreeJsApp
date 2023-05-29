import { ThreeElements, useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';


export default function Box(props) {

    const [isActive,setIsActive] = useState(false);
    const mesh = useRef<ThreeElements['mesh']>();

    useFrame((state, delta) => {
        
        if(mesh.current && isActive){
            mesh.current.rotation.y +=delta
            mesh.current.rotation.x += delta
        }
    })

  return (
    <mesh ref={mesh} {...props} scale={isActive ? 1.2 : 1} onPointerEnter={() => setIsActive(true)} onPointerLeave={() => setIsActive(false)}>
        <boxGeometry />
        <meshStandardMaterial color={isActive ? 'green' : 'blue'}/>
    </mesh>
  )
}
