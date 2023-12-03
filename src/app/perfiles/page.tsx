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
// import tokenCamel from "../assets_contracts/json/2_token.json";
import tokenCamel from "../assets_contracts/json/3_cameltoken.json";

// the state is for select the type of user

const register = () => {
    // transferencia de tokens a otro wallet
    const [walletTransfer, setWalletTransfer] = useState("");
    const [tokensEnviar, setTokensEnviar] = useState(0); // tokens to send

    // Function to connect with MetaMask and hooks
    const { connectToMetaMask, isLoading, isConnected, account, provider } = useMetaMaskConnection();

    // obtener el saldo de la cuenta
    const [balanceUser, setBalanceUser] = useState(0);
    const [userTokens, setUserTokens] = useState(""); // tokens of user

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
    // const contrato = async () => {
    //     console.log(":C");
    //     if (!provider) return;
    //     const signer = await provider.getSigner();
    //     const contract = new ethers.Contract(storageJson.address, storageJson.abi, signer);
    //     console.log(contract);
    //     const result = await contract.leerSaludo();
    //     console.log(result);
    //     await contract.guardarSaludo("Hola");
    // };
    const transferirTokens = async () => {
        if (!provider) return;
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(tokenCamel.address, tokenCamel.abi, signer);
        console.log(contract);

        // const result = await contract.
        // console.log(result);
    };
    const getTokens = async () => {
        if (!provider) return;
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(tokenCamel.address, tokenCamel.abi, signer);
        const result = await contract.balanceOf(account);
        console.log(result);
        if (result) {
            setUserTokens(web3.utils.fromWei(result, "ether"));
        } else {
            toast.error("No se pudieron obtener los tokens.");
        }
    };

    // function for capture tokens of wallet
    const handleTokensTransfer = (e: any) => {
        if (e <= 0) {
            toast.error("Debes ingresar un número mayor a 0.");
            return;
        }
        setTokensEnviar(e);
    };
    const handleSetWalletTransfer = (e: any) => {
        if (!e.match(REGEX_ETH_ADDRESS)) {
            setErrorWallet(true);
        } else {
            setErrorWallet(false);
        }
        setWalletTransfer(e);
    };

    const mintearTokens = async () => {
        if (!provider) {
            toast.error("No se pudo conectar a la red.");
            return;
        }
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(tokenCamel.address, tokenCamel.abi, signer);
        // const sendToken = await contract.sendCameelTokens(account, ethers.parseEther("1"), { gasLimit: 3000000 });

        const mint = await contract.mint(account, ethers.parseEther("1"), { gasLimit: 3000000 });

        // console.log(await contract.balanceOf(account));
        if (mint) {
            toast.success("Tokens minteados.");
        } else {
            toast.error("No se pudieron ");
        }

        // const transferTokens = await contract.transfer(account, 100);
    };

    const enviarTokens = async () => {
        try {
            if (!provider) {
                toast.error("No se pudo conectar a la red.");
                return;
            }
            if (walletTransfer == "" || walletTransfer == null) {
                toast.error("Debes ingresar una dirección de wallet.");
                return;
            }
            console.log(walletTransfer, account);
            if (walletTransfer.toString().toLowerCase() == account.toString().toLowerCase()) {
                toast.error("No puedes enviar tokens a tu misma wallet.");
                return;
            }
            if (!REGEX_ETH_ADDRESS.test(walletTransfer)) {
                toast.error("La dirección de la wallet no es válida.");
                return;
            }
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(tokenCamel.address, tokenCamel.abi, signer);
            const transferFrom = await contract.transferFrom(account, walletTransfer, tokensEnviar.toString());
            // si la transferencia es rechazada
            if (transferFrom.wait()) {
                toast.error("No se pudo realizar la transferencia.");
                return;
            } else {
                toast.success("Transferencia realizada.");
                // setear los valores en 0
                setWalletTransfer("");
                setTokensEnviar(0);
            }
        } catch (error) {
            toast.error("No se pudo realizar la transferencia.");
        }
    };

    return (
        <>
            <div className=" flex flex-col items-center bgWaves">
                <Image src="/images/CameelersIcon.png" alt="Logo Cameelers" width={200} height={200} className="object-contain"></Image>
                <Toaster />
                <div className="card w-2/4 bg-base-100 shadow-xl overflow-auto mb-10">
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
                                                <div className="flex items-center justify-center">
                                                    <button
                                                        className={"btn btn-primary" + (isConnected ? " btn-success" : "")}
                                                        onClick={!isConnected ? connectToMetaMask : undefined}
                                                        disabled={isLoading}>
                                                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/metamask-logo.png" alt="metamask-logo" />
                                                        {isConnected ? `Conectado: ${account}` : "Conectar a MetaMask"}
                                                    </button>
                                                    {isLoading && <p className="ml-2">Conectando...</p>}
                                                </div>
                                                <div className="flex justify-center items-center flex-wrap space-y-2">
                                                    {isConnected ? (
                                                        <>
                                                            <div className="flex flex-wrap items-center justify-center space-y-2">
                                                                <button className="btn btn-primary" onClick={getSaldos}>
                                                                    <img width="28" height="28" src="https://img.icons8.com/pulsar-color/48/weight-care.png" alt="weight-care" />
                                                                    Obtener Balance
                                                                </button>
                                                                {/* <button className="btn btn-primary ml-4" onClick={() => document.getElementById("modal_transation").showModal()}>
                                                                    <img width="28" height="28" src="https://img.icons8.com/windows/32/data-in-both-directions.png" alt="data-in-both-directions" />
                                                                    Transferir
                                                                </button> */}
                                                                <button className="btn btn-primary ml-4" onClick={mintearTokens}>
                                                                    <img width="28" height="28" src="https://img.icons8.com/fluency/48/golden-fever.png" alt="golden-fever" />
                                                                    Mintear Token
                                                                </button>
                                                                <button className="btn btn-primary ml-4" onClick={getTokens}>
                                                                    <img width="28" height="28" src="https://img.icons8.com/office/16/cheap--v1.png" alt="cheap--v1" />
                                                                    Balance de CML
                                                                </button>
                                                                {/*  */}
                                                                {/* es para hacer transderencia */}
                                                                <dialog id="modal_transation" className="modal">
                                                                    <div className="modal-box">
                                                                        <h3 className="font-bold text-lg">Transferir tokens</h3>
                                                                        <div className="flex flex-col space-y-2">
                                                                            <label htmlFor="">
                                                                                <span className="label-text">Dirección a enviar tokens</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="0x"
                                                                                className="input input-bordered w-full "
                                                                                onChange={(e) => handleSetWalletTransfer(e.target.value)}
                                                                            />
                                                                            <label htmlFor="">
                                                                                <span className="label-text">Cantidad de tokens</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="0"
                                                                                className="input input-bordered w-full "
                                                                                onChange={(e) => handleTokensTransfer(e.target.value)}
                                                                            />
                                                                            <button className="btn btn-primary" onClick={enviarTokens}>
                                                                                Enviar
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-action">
                                                                            <form method="dialog">
                                                                                {/* if there is a button in form, it will close the modal */}
                                                                                <button className="btn">Close</button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </dialog>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </div>
                                                <div>
                                                    Tokens: <span className="">{userTokens} CML</span>
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
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
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
        </>
    );
};

export default register;
