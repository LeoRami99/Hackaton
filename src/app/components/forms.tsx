

const Forms = () => {
    return (
        
        


       

    <form className="form-control space-y-4 space-x-2  w-full items-center ">
        <input type="text" placeholder="Numero de oferta" className=" input input-bordered w-full max-w-sm " />
        <input type="text" placeholder="Descripcion" className=" input input-bordered w-full max-w-sm " />
        <input type="text" placeholder="Wallet de la compañia" className="input input-bordered w-full max-w-sm" />
        <select className="select select-bordered w-full max-w-sm">
            <option disabled selected>Estado de la oferta</option>
            <option>Activo</option>
            <option>Inactivo</option>
        </select>
        <input type="date" placeholder="" className="input input-bordered w-full max-w-sm" />

        <label htmlFor="my_modal_6" className="btn">Crear</label>

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


    </form>

   

    )
}
export default Forms;