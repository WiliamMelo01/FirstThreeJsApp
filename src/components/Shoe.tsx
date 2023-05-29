import { useFrame, useLoader } from '@react-three/fiber';
import React, { useLayoutEffect, useRef } from 'react';
// OBJLOADER
import { TextureLoader } from 'expo-three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import * as THREE from 'three';

import { SensorType, useAnimatedSensor } from 'react-native-reanimated';

export default function Shoe() {

    const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
  interval: 100,
});


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
                    child.material.normalMap = normal;
                    child.material.roughnessMap = rough;
                }                   
            })
        }, [obj])

        const shoeRef = useRef();

        useFrame((state, delta) => {
            if(shoeRef.current){
                let { x, y, z } = animatedSensor.sensor.value;
                x = ~~(x * 100) / 5000;
                y = ~~(y * 100) / 5000;
                shoeRef.current.rotation.x += x;
                shoeRef.current.rotation.y += y;
            }
            
          });

  return (
    <mesh  ref={shoeRef} rotation={[0.8,0.5,0]}>
        <primitive object={obj} scale={10}/>
    </mesh>
  )
}
