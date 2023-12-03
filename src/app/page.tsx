import Image from "next/image";
import Link from "next/link";
import "./perfiles/perfiles.css";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bgWaves">
            {/* <Navbar></Navbar> */}
            <Image src="/images/CameelersIcon.png" alt="Logo Cameelers" width={500} height={500}></Image>
            <Link href="/perfiles" className="btn btn-primary w-96">
                Empezar
            </Link>
        </main>
    );
}
