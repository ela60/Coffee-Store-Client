import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
    const { _id, name, quantity, supplier, category, details, photo } = coffee;
    console.log(coffee);
    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/coffee/${id}`, {
                        method: "DELETE",
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.deletedCount > 0) {
                                swalWithBootstrapButtons.fire({
                                    title: "Deleted!",
                                    text: "Your Coffee has been deleted.",
                                    icon: "success"
                                });
                                const remaining = coffees.filter(cof => cof._id != _id);
                                setCoffees(remaining);
                            }
                        })
                        .catch((error) => {
                            console.error("Error deleting item:", error);
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your item is safe :)",
                        icon: "error"
                    });
                }
            });
    };

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure>
                <img src={photo} alt={name} />
            </figure>
            <div className="flex justify-between w-full pr-4">
                <div>
                    <h2 className="card-title">Name: {name}</h2>
                    <p>Details: {details}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Supplier: {supplier}</p>
                    <p>Category: {category}</p>
                </div>
                <div className="card-actions justify-end">
                    <div className="join join-vertical space-y-4">
                        <button className="btn bg-blue-700 hover:bg-blue-800">
                            View
                        </button>
                       
                        <Link to={`updateCoffee/${_id}`}>
                        <button className="btn bg-yellow-600 hover:bg-yellow-700">
                            Edit
                        </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(_id)}
                            className="btn bg-red-600 hover:bg-red-700">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;
