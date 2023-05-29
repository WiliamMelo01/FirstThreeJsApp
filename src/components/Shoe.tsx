import { useFrame, useLoader } from '@react-three/fiber';
import React, { useLayoutEffect, useRef } from 'react';
// OBJLOADER
import { TextureLoader } from 'expo-three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import * as THREE from 'three';

export default function Shoe() {

    const [base,normal,rough] = useLoader(TextureLoader, [require('../../assets/Airmax/textures/BaseColor.jpg'),require('../../assets/Airmax/textures/Normal.jpg'),require('../../assets/Airmax/textures/Roughness.png')])

    const material = useLoader(MTLLoader,require('../../assets/Airmax/shoe.mtl'));

    const obj = useLoader(
        OBJLoader,
        require('../../assets/Airmax/shoe.obj'),(loader)=>{
            material.preload()
            loader.setMaterials(material)
        });

        useLayoutEffect(() => {
            obj.traverse(child => {
                if(child instanceof THREE.Mesh){
                    child.material.map = base;
                }                   
            })
        }, [obj])

        const shoeRef = useRef();

        useFrame((state, delta) => {
            if(shoeRef.current){
                shoeRef.current.rotation.x +=delta;
                shoeRef.current.rotation.y +=delta / 4;
            }
        })

  return (
    <mesh  ref={shoeRef} rotation={[1,0,0]}>
        <primitive object={obj} scale={10}/>
    </mesh>
  )
}
