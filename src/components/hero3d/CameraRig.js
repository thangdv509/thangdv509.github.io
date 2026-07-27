import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const IDLE_POS = new THREE.Vector3(0, 1.15, 3.35);
const IDLE_LOOKAT = new THREE.Vector3(0, 0.6, -0.35);
const IDLE_OFFSET = IDLE_POS.clone().sub(IDLE_LOOKAT);

// The scene is composed for a wide banner (~1.6:1). On narrower/portrait
// viewports the same vertical FOV shows much less width, clipping the desk's
// edges — so we dolly back proportionally as the aspect ratio narrows.
const BASE_ASPECT = 1.6;
const MAX_ZOOM_OUT = 2.2;

const _objPos = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _idlePos = new THREE.Vector3();

export default function CameraRig({ focus, reducedMotion }) {
  const { camera, pointer, size } = useThree();
  const currentLookAt = useRef(IDLE_LOOKAT.clone());
  const desiredPos = useRef(new THREE.Vector3().copy(IDLE_POS));
  const desiredLookAt = useRef(new THREE.Vector3().copy(IDLE_LOOKAT));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const aspect = size.width / size.height;
    const distScale = Math.min(MAX_ZOOM_OUT, Math.max(1, BASE_ASPECT / aspect));

    if (focus) {
      _objPos.set(focus.position[0], focus.position[1], focus.position[2]);
      _idlePos.copy(IDLE_LOOKAT).addScaledVector(IDLE_OFFSET, distScale);
      _dir.subVectors(_idlePos, _objPos).normalize();
      desiredPos.current.copy(_objPos).addScaledVector(_dir, 0.85 * distScale);
      desiredPos.current.y += 0.18;
      desiredLookAt.current.copy(_objPos);
      desiredLookAt.current.y += 0.05;
    } else {
      const breathe = reducedMotion ? 0 : Math.sin(t * 0.25) * 0.05;
      const parallaxX = reducedMotion ? 0 : pointer.x * 0.3;
      const parallaxY = reducedMotion ? 0 : -pointer.y * 0.15;
      _idlePos.copy(IDLE_LOOKAT).addScaledVector(IDLE_OFFSET, distScale);
      desiredPos.current.set(_idlePos.x + parallaxX, _idlePos.y + parallaxY + breathe, _idlePos.z);
      desiredLookAt.current.copy(IDLE_LOOKAT);
    }

    const alpha = reducedMotion ? 1 : 1 - Math.pow(0.0015, delta);
    camera.position.lerp(desiredPos.current, alpha);
    currentLookAt.current.lerp(desiredLookAt.current, alpha);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
