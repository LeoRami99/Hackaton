const Card = () => {
    return (
        <>
                <div className="card w-80 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
            <img src="images/work.png" alt="Work" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">Desarrollador de Software</h2>
            <p>Únete a nuestro equipo como Desarrollador de Software</p>
            <div className="card-actions">

            <label htmlFor="my_modal_6" className="btn">Detalle</label>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Requisitos</h3>
                <p className="py-4">Front End</p>
                <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">Close!</label>
                </div>
            </div>
            </div>
            </div>
        </div>
            </div>

       
</>
    )
}
export default Card