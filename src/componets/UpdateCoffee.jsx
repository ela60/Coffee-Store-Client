import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const coffee = useLoaderData();

    const { _id, name, quantity, supplier, category, details, photo,taste } = coffee;


    const handleUpdateCoffee = event => {
        event.preventDefault();


        const form = event.target;

        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.Supplier.value;
        const category = form.category.value;
        const details = form.details.value;
        const taste = form.Taste.value;
        const photo = form.photo.value;


        const updateCoffee = { name, quantity, supplier, category, details, photo,taste }
        
        // send data to the server
        fetch(`http://localhost:5000/coffee/${_id} `, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount>0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'User Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                }
        })
        
    }



    return (
        <div className="bg-slate-400 p-24">
            <h2 className="text-5xl font-bold text-center py-3">Update coffee :{ name}</h2>
            <form onSubmit={handleUpdateCoffee}>
                {/* form name and quantity row */}
          <div className="md:flex">
            <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Coffee Name</span>
                        </label>
                        <label className="input-group">
                          
                            <input type="text" name="name"defaultValue={name} placeholder="Quantity Name" className="input input-bordered w-full"/>
                        </label>
            </div>
            <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Available Quantity</span>
                        </label>
                        <label className="input-group">
                          
                            <input type="text" name="quantity"defaultValue={quantity} 
                                placeholder="coffee Name" className="input input-bordered w-full" />
                        </label>
            </div>
          </div>
                {/* form supplier and title row */}
          <div className="md:flex">
            <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Supplier Name</span>
                        </label>
                        <label className="input-group">
                          
                            <input type="text" name="Supplier"defaultValue={supplier} placeholder="Supplier Name" className="input input-bordered w-full"/>
                        </label>
            </div>
            <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Taste</span>
                        </label>
                        <label className="input-group">
                          
                            <input type="text" name="Taste"defaultValue={taste} 
                                placeholder="Taste" className="input input-bordered w-full" />
                        </label>
            </div>
          </div>
                {/* form category and details row */}
        
               
          <div className="md:flex">
            <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <label className="input-group">
                          
                            <input type="text" name="category" defaultValue={ category} placeholder="category" className="input input-bordered w-full"/>
                        </label>
            </div>
            <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <label className="input-group">
                          
                            <input type="text" name="details"defaultValue={details}
                                placeholder="details" className="input input-bordered w-full" />
                        </label>
            </div>
                </div>
               {/* form photo row */}  
          <div className="">
            <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Photo Url</span>
                        </label>
                        <label className="input-group">
                          
                            <input type="text" name="photo"defaultValue={photo} placeholder="Photo Url" className="input input-bordered w-full"/>
                        </label>
            </div>
           
                </div>
                
                
                <input type="submit"value="Update coffee" className="btn btn-block" />
        </form>
      </div>
    );
};

export default UpdateCoffee;