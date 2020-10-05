import React, { useRef, Suspense } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';

import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

import body from '../assets/body.dae';
import pmc from '../assets/pmc.dae';
import pmc_bumper from '../assets/pmc_bumper.dae';
import pmc_skin_ from '../assets/pmc_skin_.dae';

import { CLOCKWISE, ROTATION_SPEED } from '../constants/astrobee';

const Asset = ({ url }) => {
    const collada = useLoader(ColladaLoader, url);
    return (
        <primitive object={collada.scene.clone()} dispose={null} />
    );
}

export const Astrobee = (props) => {
    const group = useRef();
    useFrame(() => (group.current.rotation.y += (props.rotationDirection === CLOCKWISE ? -ROTATION_SPEED : ROTATION_SPEED)));

    const mirrored = useRef();
    useFrame(() => (mirrored.current.scale.z = -1));

    return (
        <group ref={group}>
            <Suspense fallback={null}>
                <Asset url={body} />
                <Asset url={pmc} />
                <Asset url={pmc_bumper} />
                <Asset url={pmc_skin_} />
                <group ref={mirrored}>
                    <Asset url={pmc_bumper} />
                    <Asset url={pmc_skin_} />
                    <Asset url={pmc} />
                </group>
            </Suspense>
        </group>
    ); 
}
