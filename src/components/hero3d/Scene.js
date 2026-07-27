import React from 'react';
import { ContactShadows, Sparkles } from '@react-three/drei';
import CameraRig from './CameraRig';
import {
  Desk,
  DeskLamp,
  Laptop,
  Monitor,
  Mug,
  Books,
  Shelf,
  Plant,
  StickyNotes,
  Sticker,
  FramedPhoto,
  Ticket,
  InteractiveObject,
} from './RoomObjects';
import { OBJECTS, getObject } from './sectionTargets';
import painPhoto from '../../assets/pain.jpg';
import t1Photo from '../../assets/T1.jpeg';
import avatarPhoto from '../../assets/Homepage_avatar.png';

export default function Scene({ onActivate, focusId, reducedMotion, screenOn }) {
  const focus = focusId ? getObject(focusId) : null;

  return (
    <>
      <CameraRig focus={focus} reducedMotion={reducedMotion} />

      <ambientLight intensity={0.75} color="#a99bd6" />
      <hemisphereLight args={['#7d6cb0', '#241c33', 0.7]} />
      <directionalLight position={[2.2, 3.4, 2.6]} intensity={1.3} color="#fbeee0" />
      <pointLight position={[0, 1.6, 2.4]} intensity={0.5} color="#c9b8ff" distance={5} decay={2} />

      <Desk />
      <DeskLamp position={[-1.65, 0.045, -0.55]} />

      {/* Gallery wall — decorative, not clickable, like the shelf's framed certificate.
          Clustered center, below the shelf (Achievements), so it stays in frame. */}
      <FramedPhoto src={painPhoto} position={[-0.48, 1.1, -0.97]} size={0.27} tilt={-0.05} />
      <FramedPhoto src={t1Photo} position={[0, 1.24, -0.96]} size={0.27} tilt={0.02} />
      <FramedPhoto src={avatarPhoto} position={[0.48, 1.1, -0.97]} size={0.27} tilt={0.05} />

      {OBJECTS.map((obj) => {
        const props = {
          key: obj.id,
          id: obj.id,
          label: obj.label,
          position: obj.position,
          onActivate,
          reducedMotion,
        };
        switch (obj.id) {
          case 'laptop':
            return (
              <InteractiveObject {...props} floatStrength={0.02}>
                <Laptop screenOn={screenOn} />
              </InteractiveObject>
            );
          case 'monitor':
            return (
              <InteractiveObject {...props}>
                <Monitor />
              </InteractiveObject>
            );
          case 'mug':
            return (
              <InteractiveObject {...props}>
                <Mug />
              </InteractiveObject>
            );
          case 'books':
            return (
              <InteractiveObject {...props}>
                <Books />
              </InteractiveObject>
            );
          case 'shelf':
            return (
              <InteractiveObject {...props} floatStrength={0.02}>
                <Shelf />
              </InteractiveObject>
            );
          case 'plant':
            return (
              <InteractiveObject {...props}>
                <Plant />
              </InteractiveObject>
            );
          case 'notes':
            return (
              <InteractiveObject {...props}>
                <StickyNotes />
              </InteractiveObject>
            );
          case 'github':
            return (
              <InteractiveObject {...props} floatStrength={0.03}>
                <Sticker color="#e0e8f0" />
              </InteractiveObject>
            );
          case 'scholar':
            return (
              <InteractiveObject {...props} floatStrength={0.03}>
                <Sticker color="#64a5ff" />
              </InteractiveObject>
            );
          case 'ticket':
            return (
              <InteractiveObject {...props}>
                <Ticket />
              </InteractiveObject>
            );
          default:
            return null;
        }
      })}

      {!reducedMotion && (
        <Sparkles count={35} size={2.2} speed={0.25} opacity={0.35} color="#c084fc" scale={[3.4, 1.6, 2]} position={[0, 0.9, 0]} />
      )}

      <ContactShadows position={[0, -1.075, 0]} opacity={0.45} scale={6} blur={2.4} far={1.2} color="#0a0712" />
    </>
  );
}
