// Declaration for the page of register user and company
"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import "./perfiles.css";
import useMetaMaskConnection from "../hooks/useMetamask";
import { ethers } from "ethers";
import web3 from "web3";
import storageJson from "../assets_contracts/json/1_storage.json";

// the state is for select the type of user

const register = () => {
    // Function to connect with MetaMask and hooks
    const { connectToMetaMask, isLoading, isConnected, account, provider } = useMetaMaskConnection();

    // obtener el saldo de la cuenta
    const [balanceUser, setBalanceUser] = useState(0);

    const [listSkillsWithToken, setListSkillsWithToken] = useState([]); // list of skills with token
    const [tokenName, setTokenName] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");

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

    // function to add tokesn with skills
    const handleAddTokenSkill = () => {
        if (!tokenName || !tokenAddress) {
            toast.error("Debes llenar todos los campos.");
            return;
        }
        if (REGEX_ETH_ADDRESS.test(tokenAddress) === false) {
            toast.error("La dirección del token no es válida.");
            return;
        }

        // limiatar a 5 tokens
        if (listSkillsWithToken.length >= 10) {
            toast.error("Solo puedes agregar 10 tokens.");
            return;
        }
        const newToken = {
            skillName: tokenName.toUpperCase(),
            token: tokenAddress,
        };
        setListSkillsWithToken([...listSkillsWithToken, newToken]);
        // Limpiar campos después de agregar
        setTokenName("");
        setTokenAddress("");
    };
    const getSaldos = async () => {
        if (isConnected && account) {
            if (provider) {
                try {
                    const balanceInWei = await provider.getBalance(account);

                    // convertir a eth con web3
                    const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");

                    const nameOfNetwork = await provider.getNetwork();

                    toast.success(`Conectado a la red: ${nameOfNetwork.name}`);

                    toast.success(`Su balance es: ${balanceInEth}`);

                    setBalanceUser(balanceInWei);
                } catch (error) {
                    console.error("Error al obtener el balance:", error);
                    toast.error("Error al obtener el balance.");
                }
            }
        } else {
            toast.error("No estás conectado a MetaMask y no se puede obtener el balance.");
        }
    };
    const contrato = async () => {
        console.log(":C");
        if (!provider) return;
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(storageJson.address, storageJson.abi, signer);
        console.log(contract);
        const result = await contract.leerSaludo();
        console.log(result);
        await contract.guardarSaludo("Hola");
    };

    return (
        <div className=" flex flex-col items-center bgWaves">
            <Image src="/images/CameelersIcon.png" alt="Logo Cameelers" width={200} height={200} className="object-contain"></Image>
            <Toaster />
            <div className="card w-2/4 bg-base-100 shadow-xl overflow-auto">
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
                                <div className="card w-full overflow-auto">
                                    <div className="card-body">
                                        <h2 className="text-center card-title">Usuario</h2>
                                        <div className="inputs flex space-y-1 flex-col">
                                            <div className="flex justify-center items-center">
                                                <button className={"btn btn-primary" + (isConnected ? " btn-success" : "")} onClick={!isConnected ? connectToMetaMask : undefined} disabled={isLoading}>
                                                    <img width="30" height="30" src="https://img.icons8.com/stickers/100/metamask-logo.png" alt="metamask-logo" />
                                                    {isConnected ? `Conectado: ${account}` : "Conectar a MetaMask"}
                                                </button>
                                                <button className="btn btn-primary ml-2" onClick={getSaldos}>
                                                    Obtener Balance
                                                </button>

                                                {isLoading && <p>Conectando...</p>}
                                            </div>
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
                                                <input
                                                    type="text"
                                                    placeholder="Nombre del token"
                                                    className="input input-bordered w-full"
                                                    value={tokenName}
                                                    onChange={(e) => setTokenName(e.target.value)}
                                                />
                                                <div className="join">
                                                    <input
                                                        type="text"
                                                        placeholder="0x"
                                                        className="input input-bordered join-item w-full"
                                                        value={tokenAddress}
                                                        onChange={(e) => setTokenAddress(e.target.value)}
                                                    />
                                                    <button className="btn btn-success join-item" onClick={handleAddTokenSkill}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary">Registrar</button>
                                        {listSkillsWithToken.length > 0 ? (
                                            <div tabIndex={0} className="collapse bg-orange-100">
                                                <div className="collapse-title text-xl font-medium">Tokens Agregados</div>
                                                <div className="collapse-content space-y-2">
                                                    {listSkillsWithToken.map((skill: any, index: number) => (
                                                        <div className="flex justify-between items-center" key={index}>
                                                            <div className="flex justify-center items-center">
                                                                <div className="badge badge-outline badge-dark">{skill.skillName}</div>
                                                                <div className="badge badge-outline badge-dark ml-2">{skill.token}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
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
