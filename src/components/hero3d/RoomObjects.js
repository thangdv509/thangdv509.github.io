import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Html, useCursor, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const _scale = new THREE.Vector3();

// Procedurally draws a tiny "code editor" look (titlebar dots + syntax-colored
// lines) so the monitor reads as a screen showing something, not a flat color.
let _codeScreenTexture = null;
function getCodeScreenTexture() {
  if (_codeScreenTexture) return _codeScreenTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0c1420';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#182030';
  ctx.fillRect(0, 0, canvas.width, 20);
  ['#f28b82', '#fbbc78', '#8bd48b'].forEach((c, i) => {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(15 + i * 16, 10, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  const lineColors = ['#a78bfa', '#64a5ff', '#f472b6', '#c084fc', '#7bb3ff'];
  const widths = [120, 78, 150, 60, 132, 92, 150, 70, 108];
  let y = 38;
  widths.forEach((w, i) => {
    ctx.fillStyle = lineColors[i % lineColors.length];
    ctx.globalAlpha = 0.85;
    ctx.fillRect(16 + (i % 3) * 12, y, w, 7);
    y += 13;
  });
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
  // These textures are viewed at a steep, near-edge-on angle (the keyboard
  // deck, the monitor screen) — without anisotropic filtering that oblique
  // sampling reads as blurry from a distance, even though the source is sharp.
  texture.anisotropy = 16;
  _codeScreenTexture = texture;
  return texture;
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Draws a small grid of keys + a trackpad so the laptop deck reads as an
// actual keyboard instead of a blank rectangle.
let _keyboardTexture = null;
function getKeyboardTexture() {
  if (_keyboardTexture) return _keyboardTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 427;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#241f30';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cols = 12;
  const rows = 3;
  const marginX = 14;
  const marginTop = 14;
  const marginBottom = 56;
  const gap = 6;
  const cellW = (canvas.width - marginX * 2 - gap * (cols - 1)) / cols;
  const cellH = (canvas.height - marginTop - marginBottom - gap * (rows - 1)) / rows;

  // Easter egg: the row closest to the camera spells out "CHU CUN HONG" —
  // a nod to the reference site (chucunhong.github.io) this design was inspired by.
  const nickRow = rows - 1;
  const nickLetters = ['C', 'H', 'U', '', 'C', 'U', 'N', '', 'H', 'O', 'N', 'G'];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = marginX + c * (cellW + gap);
      const y = marginTop + r * (cellH + gap);
      const letter = r === nickRow ? nickLetters[c] : '';
      ctx.fillStyle = r === nickRow && letter ? '#6f5fa8' : '#3a3148';
      roundRectPath(ctx, x, y, cellW, cellH, 2);
      ctx.fill();
      if (letter) {
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.floor(cellH * 0.85)}px 'Arial', 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, x + cellW / 2, y + cellH / 2 + 1);
      }
    }
  }

  const padW = 90;
  const padH = 26;
  ctx.fillStyle = '#2c2638';
  roundRectPath(ctx, (canvas.width - padW) / 2, canvas.height - marginBottom + 8, padW, padH, 5);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
  // These textures are viewed at a steep, near-edge-on angle (the keyboard
  // deck, the monitor screen) — without anisotropic filtering that oblique
  // sampling reads as blurry from a distance, even though the source is sharp.
  texture.anisotropy = 16;
  _keyboardTexture = texture;
  return texture;
}

// Shared wrapper: gives every clickable prop a gentle idle "breathing" motion,
// a floaty hover-lift, a pointer cursor, and a small name tag on hover.
export function InteractiveObject({ id, label, position, onActivate, reducedMotion, floatStrength = 0.05, children }) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const breathe = reducedMotion ? 0 : Math.sin(t * 0.6 + seed) * 0.012;
    const lift = reducedMotion ? 0 : hovered ? Math.sin(t * 4 + seed) * floatStrength : 0;
    group.current.position.y = position[1] + breathe + lift;
    const s = hovered ? 1.06 : 1;
    group.current.scale.lerp(_scale.set(s, s, s), 0.18);
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const native = e.nativeEvent || e;
        onActivate(id, { x: native.clientX, y: native.clientY });
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {children}
      {hovered && (
        <Html center position={[0, 0.4, 0]} style={{ pointerEvents: 'none' }}>
          <div className="hero3d-tooltip">{label}</div>
        </Html>
      )}
    </group>
  );
}

export function Desk() {
  // The 3D scene always keeps this same night-desk look, regardless of the
  // site's light/dark theme toggle — only the outer card frame around it themes.
  const deskColor = '#4a4059';
  const legColor = '#332a40';
  const wallColor = '#2e2638';
  return (
    <group>
      <RoundedBox args={[3.7, 0.09, 1.7]} radius={0.05} smoothness={2} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color={deskColor} roughness={0.55} metalness={0.05} />
      </RoundedBox>
      {[
        [-1.7, -0.55, -0.7],
        [1.7, -0.55, -0.7],
        [-1.7, -0.55, 0.7],
        [1.7, -0.55, 0.7],
      ].map((p, i) => (
        <RoundedBox key={i} args={[0.09, 1.05, 0.09]} radius={0.02} smoothness={1} position={p}>
          <meshStandardMaterial color={legColor} roughness={0.6} />
        </RoundedBox>
      ))}
      {/* Back wall — deliberately oversized (well beyond the desk's own footprint)
          so it always fills the frame edge-to-edge, even on ultra-wide viewports
          or when the camera dollies back for a narrow/portrait aspect ratio. */}
      <mesh position={[0, 1.4, -1.05]} receiveShadow>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

export function DeskLamp({ position = [-1.5, 0.045, -0.55] }) {
  const bulbRef = useRef();
  useFrame((state) => {
    if (!bulbRef.current) return;
    const t = state.clock.elapsedTime;
    bulbRef.current.material.emissiveIntensity = 1.6 + Math.sin(t * 1.6) * 0.15;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.03, 16]} />
        <meshStandardMaterial color="#171320" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.32, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.018, 0.018, 0.64, 8]} />
        <meshStandardMaterial color="#3a3245" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0.11, 0.58, 0]} rotation={[0, 0, -0.55]}>
        <cylinderGeometry args={[0.014, 0.014, 0.4, 8]} />
        <meshStandardMaterial color="#3a3245" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh ref={bulbRef} position={[0.28, 0.72, 0]} rotation={[0, 0, 1.1]}>
        <coneGeometry args={[0.16, 0.22, 24, 1, true]} />
        <meshStandardMaterial
          color="#ffdca8"
          emissive="#ffb35c"
          emissiveIntensity={1.6}
          side={THREE.DoubleSide}
          roughness={0.3}
        />
      </mesh>
      <pointLight position={[0.28, 0.62, 0]} color="#ffcf8f" intensity={0.9} distance={2.4} decay={2} />
    </group>
  );
}

export function Laptop({ screenOn }) {
  const keyboardTexture = useMemo(() => getKeyboardTexture(), []);
  return (
    <group>
      <RoundedBox args={[0.62, 0.03, 0.44]} radius={0.02} smoothness={2} position={[0, 0, 0.02]}>
        <meshStandardMaterial color="#4a4059" roughness={0.4} metalness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0.03, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial
          map={keyboardTexture}
          emissiveMap={keyboardTexture}
          emissive="#9c8bd9"
          emissiveIntensity={0.6}
          roughness={0.7}
        />
      </mesh>
      {/* hinge pivot sits at the back edge of the base; the screen panel is offset
          upward from it so rotating the hinge swings the screen open from the bottom */}
      <group position={[0, 0.017, -0.2]} rotation={[-0.25, 0, 0]}>
        <RoundedBox args={[0.62, 0.4, 0.02]} radius={0.02} smoothness={2} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#4a4059" roughness={0.4} metalness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0.2, 0.012]}>
          <planeGeometry args={[0.55, 0.34]} />
          <meshStandardMaterial
            color="#150f1e"
            emissive={screenOn ? '#a78bfa' : '#3d3453'}
            emissiveIntensity={screenOn ? 0.4 : 0.18}
          />
        </mesh>
      </group>
    </group>
  );
}

export function Monitor() {
  const screenTexture = useMemo(() => getCodeScreenTexture(), []);
  return (
    <group>
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.05, 20]} />
        <meshStandardMaterial color="#3a3148" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <boxGeometry args={[0.06, 0.22, 0.06]} />
        <meshStandardMaterial color="#3a3148" roughness={0.5} metalness={0.3} />
      </mesh>
      <RoundedBox args={[0.78, 0.5, 0.04]} radius={0.03} smoothness={2}>
        <meshStandardMaterial color="#4a4059" roughness={0.45} metalness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[0.7, 0.42]} />
        <meshStandardMaterial
          map={screenTexture}
          emissiveMap={screenTexture}
          emissive="#ffffff"
          emissiveIntensity={0.4}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export function Mug() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.09, 0.075, 0.16, 24]} />
        <meshStandardMaterial color="#d88b4a" roughness={0.5} />
      </mesh>
      <mesh position={[0.06, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.05, 0.014, 10, 16, Math.PI]} />
        <meshStandardMaterial color="#d88b4a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.085, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.006, 24]} />
        <meshStandardMaterial color="#2a1a10" roughness={0.8} />
      </mesh>
    </group>
  );
}

export function Ticket() {
  // Flat marks printed on top of the card use the same rotation as the
  // keyboard deck (see Laptop above): rotate -90° around X to lie flat facing
  // up, and keep clearance from the base's top face to avoid it disappearing
  // into the base's own surface.
  const FLAT = [-Math.PI / 2, 0, 0];
  const TOP = 0.026;
  return (
    <group rotation={[0, 0, -0.05]}>
      <RoundedBox args={[0.2, 0.022, 0.13]} radius={0.006} smoothness={1}>
        <meshStandardMaterial color="#f5f1ea" roughness={0.75} />
      </RoundedBox>
      <mesh position={[-0.06, TOP, 0]} rotation={FLAT}>
        <planeGeometry args={[0.075, 0.13]} />
        <meshStandardMaterial color="#a78bfa" roughness={0.6} />
      </mesh>
      <mesh position={[-0.06, TOP + 0.001, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[0.04, 0.04]} />
        <meshStandardMaterial color="#f5f1ea" roughness={0.6} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-0.014 + i * 0.011, TOP, 0.05]} rotation={FLAT}>
          <circleGeometry args={[0.0025, 8]} />
          <meshStandardMaterial color="#b7aed6" roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0.03, TOP, 0.02]} rotation={FLAT}>
        <planeGeometry args={[0.09, 0.007]} />
        <meshStandardMaterial color="#b7aed6" roughness={0.7} />
      </mesh>
      <mesh position={[0.03, TOP, -0.008]} rotation={FLAT}>
        <planeGeometry args={[0.065, 0.005]} />
        <meshStandardMaterial color="#b7aed6" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function Books() {
  const colors = ['#a78bfa', '#64a5ff', '#f472b6', '#c084fc'];
  return (
    <group rotation={[0, 0.12, 0]}>
      {colors.map((c, i) => (
        <RoundedBox
          key={i}
          args={[0.44 - i * 0.02, 0.06, 0.32 - i * 0.015]}
          radius={0.012}
          smoothness={1}
          position={[0, i * 0.065 + 0.03, 0]}
        >
          <meshStandardMaterial color={c} roughness={0.7} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.3, 0.02, 0.22]} radius={0.01} smoothness={1} position={[0.02, 0.29, 0.03]} rotation={[-0.25, 0.2, 0.05]}>
        <meshStandardMaterial color="#f5f1ea" roughness={0.8} />
      </RoundedBox>
    </group>
  );
}

export function Shelf() {
  return (
    <group>
      <RoundedBox args={[1.5, 0.05, 0.3]} radius={0.02} smoothness={1}>
        <meshStandardMaterial color="#332b40" roughness={0.6} />
      </RoundedBox>
      <mesh position={[-0.5, 0.14, 0.02]}>
        <coneGeometry args={[0.05, 0.16, 4]} />
        <meshStandardMaterial color="#f4c563" roughness={0.35} metalness={0.6} />
      </mesh>
      <mesh position={[-0.5, 0.045, 0.02]}>
        <cylinderGeometry args={[0.03, 0.035, 0.05, 12]} />
        <meshStandardMaterial color="#f4c563" roughness={0.35} metalness={0.6} />
      </mesh>
      <RoundedBox args={[0.32, 0.24, 0.015]} radius={0.008} smoothness={1} position={[0.35, 0.16, 0.02]}>
        <meshStandardMaterial color="#3a3245" roughness={0.5} metalness={0.2} />
      </RoundedBox>
      <mesh position={[0.35, 0.16, 0.03]}>
        <planeGeometry args={[0.26, 0.18]} />
        <meshStandardMaterial color="#f5f1ea" roughness={0.9} />
      </mesh>
    </group>
  );
}

// A small square-framed photo hung on the back wall. Crops whatever aspect
// ratio the source image is to a centered square, like CSS object-fit: cover.
export function FramedPhoto({ src, position, size = 0.32, tilt = 0, frameColor = '#332a40' }) {
  const texture = useTexture(src);
  if (!texture.userData.cropped) {
    const img = texture.image;
    if (img && img.width && img.height) {
      const aspect = img.width / img.height;
      if (aspect > 1) {
        texture.repeat.set(1 / aspect, 1);
        texture.offset.set((1 - 1 / aspect) / 2, 0);
      } else {
        texture.repeat.set(1, aspect);
        texture.offset.set(0, (1 - aspect) / 2);
      }
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.needsUpdate = true;
      texture.userData.cropped = true;
    }
  }

  return (
    <group position={position} rotation={[0, 0, tilt]}>
      <RoundedBox args={[size + 0.05, size + 0.05, 0.018]} radius={0.01} smoothness={1}>
        <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0.2} />
      </RoundedBox>
      <mesh position={[0, 0, 0.011]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>
    </group>
  );
}

export function Plant() {
  const leafColors = ['#6B8E7A', '#7fa389', '#5b7a68'];
  return (
    <group>
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[0.11, 0.09, 0.18, 16]} />
        <meshStandardMaterial color="#3a3245" roughness={0.7} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.07, 0.08 + (i % 2) * 0.06, Math.sin(angle) * 0.07]}
            rotation={[0.3, angle, 0]}
          >
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color={leafColors[i % leafColors.length]} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

export function StickyNotes() {
  const notes = [
    { color: '#f7a8d0', rot: -0.16, offset: [-0.05, -0.02, -0.01] },
    { color: '#d6b3fb', rot: 0.1, offset: [0.02, 0, 0] },
    { color: '#a9c8fb', rot: -0.04, offset: [0.07, 0.018, 0.01] },
  ];
  return (
    <group rotation={[-0.08, 0, 0]}>
      {notes.map((n, i) => (
        <group key={i} position={n.offset} rotation={[0, 0, n.rot]}>
          {/* thin shadow card behind each note so the stack reads as paper, not flat color */}
          <mesh position={[0.004, -0.006, -0.002]}>
            <planeGeometry args={[0.15, 0.15]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.18} />
          </mesh>
          <RoundedBox args={[0.15, 0.15, 0.006]} radius={0.006} smoothness={1}>
            <meshStandardMaterial color={n.color} roughness={0.85} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

export function Sticker({ color }) {
  return (
    <group>
      <RoundedBox args={[0.1, 0.1, 0.016]} radius={0.022} smoothness={2} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#241f2e" roughness={0.4} metalness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.05, 0.01]}>
        <circleGeometry args={[0.032, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} roughness={0.4} />
      </mesh>
    </group>
  );
}
