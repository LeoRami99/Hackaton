import Forms from "../components/forms";
import "../perfiles/perfiles.css";
import Image from "next/image";
import Navbar from "../components/navbar";
const empresa = () => {
    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-between p-24 bgWaves">
                <Image src="/images/CameelersIcon.png" alt="Logo Cameelers" width={200} height={200}></Image>
                <Forms></Forms>
            </div>
        </>
    );
};

export default empresa;
