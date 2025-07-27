import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const CreateCharacter = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("boy");
    const [skinColor, setSkinColor] = useState("#f1c27d");
    const [outfitColor, setOutfitColor] = useState("#4f83cc");
    const handleCreate = () => {
        if (name.trim() === "") return;
        alert(`Hero "${name}" created!`);
    };
    setName("");
    setAge("");
    return (
        <div style={{ display: "flex", gap: "40px", padding: "40px" }}>
            <form style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
                <h2 style={{ fontSize: "28px", background: "linear-gradient(to right, #FF512F, #DD2476)", WebkitBackgroundClip: "text", color: "transparent" }}>
                    Create Your Hero
                </h2>
                <input type="text" placeholder="Hero name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Age (optional)" value={age} onChange={(e) => setAge(e.target.value)} />

                <label>Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                </select>

                <label>Skin color:</label>
                <input type="color" value={skinColor} onChange={(e) => setSkinColor(e.target.value)} />

                <label>Outfit color:</label>
                <input type="color" value={outfitColor} onChange={(e) => setOutfitColor(e.target.value)} />

                <button
                    type="button"
                    disabled={name.trim() === ""}
                    onClick={handleCreate}
                    style={{
                        cursor: name.trim() === "" ? "not-allowed" : "pointer",
                        opacity: name.trim() === "" ? 0.5 : 1,
                    }}
                >
                    Create
                </button>
            </form>

            <div style={{ width: "400px", height: "500px" }}>
                <Canvas camera={{ position: [0, 5.5, 15], fov: 30 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 10, 5]} intensity={1.5} />
                    <OrbitControls enableZoom={false} />
                    <CartoonHero skinColor={skinColor} outfitColor={outfitColor} />
                </Canvas>
            </div>
        </div>
    );
};

const CartoonHero = ({ skinColor, outfitColor }) => {
    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.3;
        }
    });

    return (
        <group ref={ref} position={[0, -4.5, 0]}>
            {/* Head (oval) */}
            <mesh position={[0, 6.8, 0]}>
                <sphereGeometry args={[1.1, 32, 32]} />
                <meshStandardMaterial color={skinColor} />
            </mesh>

            {/* Neck */}
            <mesh position={[0, 6.0, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.5, 16]} />
                <meshStandardMaterial color={skinColor} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.4, 7, 1]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[0.4, 7, 1]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Body */}
            <mesh position={[0, 3.5, 0]}>
                <boxGeometry args={[2.5, 4, 1.5]} />
                <meshStandardMaterial color={outfitColor} />
            </mesh>

            {/* Arms */}
            <mesh position={[-2, 4.5, 0]}>
                <boxGeometry args={[1, 3.5, 1]} />
                <meshStandardMaterial color={skinColor} />
            </mesh>
            <mesh position={[2, 4.5, 0]}>
                <boxGeometry args={[1, 3.5, 1]} />
                <meshStandardMaterial color={skinColor} />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.8, 1, 0]}>
                <boxGeometry args={[0.8, 3, 1]} />
                <meshStandardMaterial color={outfitColor} />
            </mesh>
            <mesh position={[0.8, 1, 0]}>
                <boxGeometry args={[0.8, 3, 1]} />
                <meshStandardMaterial color={outfitColor} />
            </mesh>
        </group>
    );
};
