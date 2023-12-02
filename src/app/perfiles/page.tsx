// Declaration for the page of register user and company
"use client";

import { useState } from "react";
// the state is for select the type of user

const register = () => {
    // Functions
    const [typeUser, setTypeUser] = useState(0);
    const changeToUser = () => {
        setTypeUser(0);
    };
    const changeToCompany = () => {
        setTypeUser(1);
    };
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-center items-center">
                        <div className="join">
                            <div className="btn join-item" onClick={changeToUser}>
                                Usuario
                            </div>
                            <div className="btn join-item" onClick={changeToCompany}>
                                Empresas
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default register;
