import React from "react";
import "../perfiles/perfiles.css";

const Banner = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="hero h-screen bgWaves" style={{ height: "50vh" }}>
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <div className="flex items-center justify-center">
                            <iframe src="https://giphy.com/embed/xTiIzJSKB4l7xTouE8" width="380" height="180" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                        </div>

                        <p className="py-6">Bienvenido a Cammels aquí podrás encontrar oportunidades de trabajo para ti, tu eliges en que proyecto deseas participar.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
