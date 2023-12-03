// Declaration for the page of register user and company
"use client";
import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import "./perfiles.css";
import useMetamask from "../hooks/useMetamask";

// the state is for select the type of user

const register = () => {
    const _connectToMetaMask = useCallback(async () => {
        const ethereum = window.ethereum;
        // Check if MetaMask is installed
        if (typeof ethereum !== "undefined") {
            try {
                // Request access to the user's MetaMask accounts
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                // Get the connected Ethereum address
                const address = accounts[0];
                // Check address in console of web browser
                console.log("connected to MetaMask with address: ", address);
            } catch (error: Error | any) {
                alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
            }
        } else {
            alert("MetaMask not installed");
        }
    }, []);
    // Info text for the tooltip
    const infoTextTokens = "Los tokens son certificaciones que se obtienen al completar cursos en la plataforma, que te permiten demostrar tus habilidades en el mercado laboral.";

    const REGEX_ETH_ADDRESS = /^0x[a-fA-F0-9]{40}$/;
    // declarations for useStates errors
    const [errorWallet, setErrorWallet] = useState(false);

    // Declarations for useStates
    const [skill, setSkills] = useState({});
    const [walletUser, setWalletUser] = useState("");
    const [typeUser, setTypeUser] = useState(0);
    // Declarations for useStates company
    const [walletCompany, setWalletCompany] = useState("");

    //Functions
    const changeToUser = () => {
        setTypeUser(0);
    };
    const changeToCompany = () => {
        setTypeUser(1);
    };

    // functions to add skills
    const addSkills = () => {};

    const setWalletUserFunction = (e: any) => {
        if (!e.match(REGEX_ETH_ADDRESS)) {
            setErrorWallet(true);
        } else {
            setErrorWallet(false);
        }
        setWalletUser(e);
    };
    const setWalletCompanyFunction = (e: any) => {
        if (!e.match(REGEX_ETH_ADDRESS)) {
            setErrorWallet(true);
        } else {
            setErrorWallet(false);
        }
        setWalletCompany(e);
    };

    // useEffects

    return (
        <div className=" flex flex-col items-center bgWaves">
            <Image src="/images/CameelersIcon.png" alt="Picture of the author" width={200} height={200} className="object-contain"></Image>
            <Toaster />
            <div className="card w-2/4 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-col">
                        <div className="join flex justify-center items-center">
                            <div className={"btn join-item" + (typeUser == 0 ? " btn-primary" : " ")} onClick={changeToUser}>
                                Usuario
                            </div>
                            <div className={"btn join-item" + (typeUser != 0 ? " btn-primary" : " ")} onClick={changeToCompany}>
                                Empresa
                            </div>
                        </div>
                        <div className="">
                            {/* Type for role  o or 1*/}
                            {typeUser == 0 ? (
                                <div className="card w-full">
                                    <div className="card-body">
                                        <h2 className="text-center card-title">Usuario</h2>
                                        <div className="inputs flex space-y-1 flex-col">
                                            <button onClick={_connectToMetaMask}>Conectar con Metamask</button>
                                            <input type="text" placeholder="0x" className="input input-bordered w-full" onChange={(e) => setWalletUserFunction(e.target.value)} />
                                            {errorWallet ? (
                                                <div role="alert" className="alert alert-error">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>
                                                        <b>Error:</b> La dirección de la wallet no es válida
                                                    </span>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                            <div className="label">
                                                <span className="label-text">Nombres</span>
                                            </div>
                                            <input type="text" placeholder="Nombres" className="input input-bordered w-full" />
                                            <div className="label">
                                                <span className="label-text">Apellidos</span>
                                            </div>
                                            <input type="text" placeholder="Apellidos" className="input input-bordered w-full" />
                                            <div className="label">
                                                <span className="label-text">
                                                    Tokens
                                                    <div className="ml-2 tooltip" data-tip={infoTextTokens}>
                                                        <span>🛈</span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div className="tokens flex flex-col space-y-2">
                                                <input type="text" placeholder="Nombre del token" className="input input-bordered w-full " />
                                                <div className="join">
                                                    <input type="text" placeholder="0x" className="input input-bordered join-item w-full" />
                                                    <button className="btn btn-success join-item">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary">Registrar</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="card w-full">
                                    <div className="card-body ">
                                        <h2 className="card-title">Empresa</h2>
                                        <div className="inputs flex space-y-1 flex-col">
                                            <div className="label">
                                                <span className="label-text">Dirección de la wallet</span>
                                            </div>
                                            <input type="text" placeholder="0x" className="input input-bordered w-full" onChange={(e) => setWalletUserFunction(e.target.value)} />
                                            {errorWallet ? (
                                                <div role="alert" className="alert alert-error">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>
                                                        <b>Error:</b> La dirección de la wallet no es válida
                                                    </span>
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                            <div className="label">
                                                <span className="label-text">Nombre de la empresa</span>
                                            </div>
                                            <input type="text" placeholder="Nombre de la empresa" className="input input-bordered w-full" />
                                            <div className="label">
                                                <span className="label-text">Descripción de la empresa</span>
                                            </div>
                                            <textarea placeholder="Descripción de la empresa" className="textarea h-24 textarea-bordered w-full "></textarea>

                                            <div className="label">
                                                <span className="label-text">Comprar tokens</span>
                                            </div>
                                            <button className="btn btn-success">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Comprar tokens
                                            </button>
                                            {/* <input type="text" placeholder="Apellidos" className="input input-bordered w-full max-w-xs" /> */}
                                            {/* <div className="label">
                                                <span className="label-text">
                                                    Tokens
                                                    <div className="ml-2 tooltip" data-tip={infoTextTokens}>
                                                        <span>🛈</span>
                                                    </div>
                                                </span>
                                            </div> */}

                                            {/* <div className="tokens flex flex-col space-y-2">
                                                <input type="text" placeholder="Nombre del token" className="input input-bordered w-full max-w-xs" />
                                                <div className="join">
                                                    <input type="text" placeholder="0x" className="input input-bordered join-item w-full max-w-xs" />
                                                    <button className="btn btn-success join-item">+</button>
                                                </div>
                                            </div> */}
                                        </div>
                                        <button className="btn btn-primary">Registrar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default register;
