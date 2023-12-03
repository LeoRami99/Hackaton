import React from 'react';

const Banner = () => {
    return (
        <div className="flex flex-col items-center bgWaves">
            <div className="hero h-screen bg-base-200" style={{ height: "30vh" }}>
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                            Bienvenido a Cammels aquí podrás encontrar oportunidades de trabajo para ti, tu eliges en que proyecto deseas participar.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;