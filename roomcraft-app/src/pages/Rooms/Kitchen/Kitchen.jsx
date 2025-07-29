import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Floor = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
    <planeGeometry args={[6, 6]} />
    <meshStandardMaterial color="#f0f0f0" />
  </mesh>
);


const Wall = ({ position, size, color }) => (
  <mesh position={position} receiveShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
  </mesh>
);


function isColliding(pos1, size1, pos2, size2) {

  const halfWidth1 = size1[0] / 2;
  const halfDepth1 = size1[2] / 2;
  const halfWidth2 = size2[0] / 2;
  const halfDepth2 = size2[2] / 2;

  return !(
    pos1[0] + halfWidth1 <= pos2[0] - halfWidth2 ||
    pos1[0] - halfWidth1 >= pos2[0] + halfWidth2 ||
    pos1[2] + halfDepth1 <= pos2[2] - halfDepth2 ||
    pos1[2] - halfDepth1 >= pos2[2] + halfDepth2
  );
}

function useDragXZ(position, setPosition, furnitureList, size) {
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e) => {
    e.stopPropagation();
    dragging.current = false;
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    e.stopPropagation();

    const deltaX = (e.clientX - lastPointer.current.x) / 100;
    const deltaZ = (e.clientY - lastPointer.current.y) / 100;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    setPosition((pos) => {
      const halfWidth = size[0] / 2;
      const halfDepth = size[2] / 2;

     
      const minX = -3 + halfWidth;
      const maxX = 3 - halfWidth;
      const minZ = -3 + halfDepth;
      const maxZ = 3 - halfDepth;

      const newX = Math.min(Math.max(pos[0] + deltaX, minX), maxX);
      const newZ = Math.min(Math.max(pos[2] + deltaZ, minZ), maxZ);
      const newPos = [newX, pos[1], newZ];

      for (const item of furnitureList) {
        if (item.position === pos) continue;
        if (isColliding(newPos, size, item.position, item.size)) {
          return pos;
        }
      }

      return newPos;
    });
  };

  return { onPointerDown, onPointerUp, onPointerMove };
}


const furnitureSizes = {
  Fridge: [1, 2, 1],
  Oven: [1.2, 1, 1],
  KitchenCabinet: [2, 1.5, 0.6],
  CookerHood: [1.5, 0.8, 1],
  Microwave: [1.2, 0.7, 0.8],
  KitchenIsland: [3, 1.5, 2],
  BarStool: [0.6, 1, 0.6],
  Sink: [1, 0.5, 0.6],
  Table: [2, 0.1, 1],
  Chair: [0.6, 0.8, 0.6],
  Shelf: [1.5, 0.1, 0.4],
  Plant: [0.6, 0.6, 0.6], 
  Lamp: [0.4, 1, 0.4], 
  Drawer: [1, 1, 0.6],
};

const Fridge = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Fridge);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#a0c4ff" />
      </mesh>
      <mesh position={[0, 0.5, 0.51]}>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#0077b6" />
      </mesh>
    </group>
  );
};

const Oven = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Oven);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 1, 1]} />
        <meshStandardMaterial color="#ffb703" />
      </mesh>
      <mesh position={[0, 0.5, 0.51]}>
        <boxGeometry args={[1, 0.7, 0.05]} />
        <meshStandardMaterial color="#fb8500" />
      </mesh>
    </group>
  );
};

const KitchenCabinet = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.KitchenCabinet);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2, 1.5, 0.6]} />
        <meshStandardMaterial color="#6a994e" />
      </mesh>
      <mesh position={[0, 0.75, 0.31]}>
        <boxGeometry args={[1.8, 1.3, 0.05]} />
        <meshStandardMaterial color="#386641" />
      </mesh>
      <mesh position={[-0.6, 0.75, 0.35]}>
        <boxGeometry args={[0.1, 0.2, 0.05]} />
        <meshStandardMaterial color="#a7c957" />
      </mesh>
      <mesh position={[0.6, 0.75, 0.35]}>
        <boxGeometry args={[0.1, 0.2, 0.05]} />
        <meshStandardMaterial color="#a7c957" />
      </mesh>
    </group>
  );
};

const CookerHood = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.CookerHood);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.5, 0.8, 1]} />
        <meshStandardMaterial color="#bfbfbf" />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.3, 0.2, 0.8]} />
        <meshStandardMaterial color="#7f7f7f" />
      </mesh>
    </group>
  );
};

const Microwave = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Microwave);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh>
        <boxGeometry args={[1.2, 0.7, 0.8]} />
        <meshStandardMaterial color="#6a4c93" />
      </mesh>
      <mesh position={[0, 0, 0.41]}>
        <boxGeometry args={[1, 0.6, 0.05]} />
        <meshStandardMaterial color="#3c096c" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0.20, 0, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.3]} />
        <meshStandardMaterial color="#290661" />
      </mesh>
    </group>
  );
};

const KitchenIsland = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.KitchenIsland);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[3, 1.5, 2]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[3.1, 0.1, 2.1]} />
        <meshStandardMaterial color="#f4ede4" />
      </mesh>
    </group>
  );
};

const BarStool = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.BarStool);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
        <meshStandardMaterial color="#7f5539" />
      </mesh>
      <mesh position={[-0.25, 0.5, -0.25]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      <mesh position={[0.25, 0.5, -0.25]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      <mesh position={[-0.25, 0.5, 0.25]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      <mesh position={[0.25, 0.5, 0.25]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
    </group>
  );
};

const Sink = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Sink);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1, 0.5, 0.6]} />
        <meshStandardMaterial color="#6a994e" />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1, 0.1, 0.6]} />
        <meshStandardMaterial color="#386641" />
      </mesh>
      <mesh position={[-0.4, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
};

const Table = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Table);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#b5651d" />
      </mesh>
      {[[-0.9, -0.5], [0.9, -0.5], [-0.9, 0.5], [0.9, 0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.5, z]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 12]} />
          <meshStandardMaterial color="#3b2f2f" />
        </mesh>
      ))}
    </group>
  );
};

const Chair = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Chair);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.6]} />
        <meshStandardMaterial color="#ef476f" />
      </mesh>
      <mesh position={[0, 0.8, -0.25]}>
        <boxGeometry args={[0.6, 0.2, 0.2]} />
        <meshStandardMaterial color="#d90429" />
      </mesh>
    </group>
  );
};

const Shelf = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Shelf);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.4]} />
        <meshStandardMaterial color="#f4a261" />
      </mesh>
      <mesh position={[-0.7, -0.6, 0]}>
        <boxGeometry args={[0.1, 1.2, 0.1]} />
        <meshStandardMaterial color="#e76f51" />
      </mesh>
      <mesh position={[0.7, -0.6, 0]}>
        <boxGeometry args={[0.1, 1.2, 0.1]} />
        <meshStandardMaterial color="#e76f51" />
      </mesh>
    </group>
  );
};

const Plant = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Plant);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#52b788" />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 12]} />
        <meshStandardMaterial color="#1b4332" />
      </mesh>
    </group>
  );
};

const Lamp = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Lamp);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
        <meshStandardMaterial color="#ffb703" />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffd60a" />
      </mesh>
    </group>
  );
};

const Drawer = ({ position, onPositionChange, furnitureList }) => {
  const handlers = useDragXZ(position, onPositionChange, furnitureList, furnitureSizes.Drawer);
  return (
    <group
      position={position}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerMove={handlers.onPointerMove}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 0.6]} />
        <meshStandardMaterial color="#d3d3d3" />
      </mesh>
      <mesh position={[0, 0.5, 0.31]}>
        <boxGeometry args={[0.8, 0.6, 0.05]} />
        <meshStandardMaterial color="#a9a9a9" />
      </mesh>
    </group>
  );
};

export const KitchenScene = () => {
  const [wallColor, setWallColor] = useState("#dddddd");  
  const [fridgePos, setFridgePos] = useState([-2.3, 0, 2.3]);
  const [ovenPos, setOvenPos] = useState([-1.3, 0, 2.3]);
  const [cabinetPos, setCabinetPos] = useState([0, 0, 2.3]);
  const [hoodPos, setHoodPos] = useState([1.5, 0, 2.3]);
  const [microwavePos, setMicrowavePos] = useState([2.1, 0, 2.1]);

  const [islandPos, setIslandPos] = useState([0, 0, 0]);
  const [barStoolPos, setBarStoolPos] = useState([-0.6, 0, 0.8]);

  const [sinkPos, setSinkPos] = useState([2.3, 0, -0.8]);
  const [tablePos, setTablePos] = useState([1.3, 0, -1.8]);
  const [chairPos, setChairPos] = useState([1.5, 0, -1.8]);

  const [shelfPos, setShelfPos] = useState([2.3, 0, -2.3]);
  const [plantPos, setPlantPos] = useState([-2.3, 0, -2.3]);
  const [lampPos, setLampPos] = useState([-2.3, 0, -1.8]);
  const [drawerPos, setDrawerPos] = useState([-1.3, 0, -2.3]);


  const furnitureList = [
    { position: fridgePos, size: furnitureSizes.Fridge },
    { position: ovenPos, size: furnitureSizes.Oven },
    { position: cabinetPos, size: furnitureSizes.KitchenCabinet },
    { position: hoodPos, size: furnitureSizes.CookerHood },
    { position: microwavePos, size: furnitureSizes.Microwave },
    { position: islandPos, size: furnitureSizes.KitchenIsland },
    { position: barStoolPos, size: furnitureSizes.BarStool },
    { position: sinkPos, size: furnitureSizes.Sink },
    { position: tablePos, size: furnitureSizes.Table },
    { position: chairPos, size: furnitureSizes.Chair },
    { position: shelfPos, size: furnitureSizes.Shelf },
    { position: plantPos, size: furnitureSizes.Plant },
    { position: lampPos, size: furnitureSizes.Lamp },
    { position: drawerPos, size: furnitureSizes.Drawer },
  ];

  return (
<div  style={{ position: "relative" }}>
  <div
    style={{
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 10,
      background: "rgba(255,255,255,0.9)",
      padding: "10px 15px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      fontFamily: "sans-serif",
      fontSize: "14px"
    }}
  >
    <label>
      <span style={{ marginRight: "8px" }}>🎨 Color walls:</span>
      <input
        type="color"
        value={wallColor}
        onChange={(e) => setWallColor(e.target.value)}
      />
    </label>
  </div>

  <Canvas shadows camera={{ position: [10, 10, 10], fov: 35 }} style={{height:600}}>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} castShadow intensity={0.7} />
    <Floor />
    <Wall position={[3, 1, 0]} size={[0.2, 2, 6]} color={wallColor} />
    <Wall position={[-3, 1, 0]} size={[0.2, 2, 6]} color={wallColor} />
    <Wall position={[0, 1, 3]} size={[6, 2, 0.2]} color={wallColor} />
    <Wall position={[0, 1, -3]} size={[6, 2, 0.2]} color={wallColor} />

    <Fridge position={fridgePos} onPositionChange={setFridgePos} furnitureList={furnitureList} />
    <Oven position={ovenPos} onPositionChange={setOvenPos} furnitureList={furnitureList} />
    <KitchenCabinet position={cabinetPos} onPositionChange={setCabinetPos} furnitureList={furnitureList} />
    <CookerHood position={hoodPos} onPositionChange={setHoodPos} furnitureList={furnitureList} />
    <Microwave position={microwavePos} onPositionChange={setMicrowavePos} furnitureList={furnitureList} />
    <KitchenIsland position={islandPos} onPositionChange={setIslandPos} furnitureList={furnitureList} />
    <BarStool position={barStoolPos} onPositionChange={setBarStoolPos} furnitureList={furnitureList} />
    <Sink position={sinkPos} onPositionChange={setSinkPos} furnitureList={furnitureList} />
    <Table position={tablePos} onPositionChange={setTablePos} furnitureList={furnitureList} />
    <Chair position={chairPos} onPositionChange={setChairPos} furnitureList={furnitureList} />
    <Shelf position={shelfPos} onPositionChange={setShelfPos} furnitureList={furnitureList} />
    <Plant position={plantPos} onPositionChange={setPlantPos} furnitureList={furnitureList} />
    <Lamp position={lampPos} onPositionChange={setLampPos} furnitureList={furnitureList} />
    <Drawer position={drawerPos} onPositionChange={setDrawerPos} furnitureList={furnitureList} />

    <OrbitControls />
  </Canvas>
</div>

  );
};


