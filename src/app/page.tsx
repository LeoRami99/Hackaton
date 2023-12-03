import Image from "next/image";
import Card from "./components/cards";
import Navbar from "./components/navbar";
import Forms from "./components/forms";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Navbar></Navbar>
            <h1>...</h1>
            <Forms></Forms>
            <button className="btn btn-primary">Button</button>
        </main>
    );
}
