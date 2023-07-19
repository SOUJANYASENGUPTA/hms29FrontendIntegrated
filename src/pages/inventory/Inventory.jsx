import React, { useEffect, useState } from 'react'
import '../styles.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import DashboardHeader from '../../components/DashboardHeader';
const Inventory = () => {
    const [inventory, setInventories] = useState([]);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [supplier, setSupplier] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const fetchinventories = async () => {
        await axios.get('http://localhost:8080/inventory').then((response) => {
            setInventories(response.data);
        })
    }
    useEffect(() => {
        fetchinventories();
    }, [])
    const SubmitDelete = async (id) => {
        await axios.delete(`http://localhost:8080/inventory/${id}`).then(() => {
            console.log("in delete")
            fetchinventories();
        })
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                SubmitDelete(id);
                Swal.fire({
                    icon: 'success',
                    text: "Success",
                    title: 'Inventory Deleted',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    const handleEdit = (inventory) => {
        setEdit(true);
        setId(inventory.id)
        setName(inventory.name)
        setQuantity(inventory.quantity)
        setCategory(inventory.category)
        setPrice(inventory.price)
        setSupplier(inventory.supplier)
    }
    const handleNewAppointment = (e) => {
        e.preventDefault();
        setAdd(true);
        setEdit(false);
        clearFields();
    }
    const handleBack = (e) => {
        e.preventDefault();
        setAdd(false);
        setEdit(false);
        clearFields();
    }
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedinventory = {
            id: id,
            name: name,
            quantity: quantity,
            category: category,
            price: price,
            supplier: supplier
        }
        console.log(updatedinventory)
        await axios.put(`http://localhost:8080/inventory`, updatedinventory).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text:"Inventory Updated Successfully",
                showConfirmButton: false,
                timer: 1000
            })
            setEdit(false);
            clearFields();
            fetchinventories();
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const inventory = {
            name: name,
            quantity: quantity,
            category: category,
            price: price,
            supplier: supplier
        }
        console.log(inventory)
        await axios.post('http://localhost:8080/inventory', inventory).then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'inventory Added',
                showConfirmButton: false,
                timer: 1000
            })
            fetchinventories();
            setAdd(false);
            clearFields();
        }).catch((err) => {
            console.log(err);
        })
    }
    const clearFields = () => {
        setName('')
        setQuantity('')
        setCategory('')
        setPrice('')
        setSupplier('')
    }
    return (
        <div>
            <div className='dashboard-content'>
                {!edit && !add && <DashboardHeader btnText="New Inventory" onClick={handleNewAppointment} />}
                {(edit || add) && <DashboardHeader btnText="Back to Inventory" onClick={handleBack} />}
                {!edit && !add && <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Inventory List</h2>
                        <div className='dashboard-content-search'>
                            <input
                                type='text'
                                placeholder='Search..'
                                className='dashboard-content-input'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                min="1"
                                inputMode="numeric"
                            />
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>QUANTITY</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>SUPPLIER</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        {inventory.length !== 0 &&
                            <tbody>
                                {inventory
                                    .filter(inventory => {
                                        return (
                                            inventory.id.toString().includes(searchQuery) || inventory.name.toLowerCase().includes(searchQuery)
                                            || inventory.category.toLowerCase().includes(searchQuery)
                                        );
                                    })
                                    .map((inventory) => {
                                        return <tr key={inventory.id}>
                                            <td><span>{inventory.id}</span></td>
                                            <td><span>{inventory.name}</span></td>
                                            <td><span>{inventory.quantity}</span></td>
                                            <td><span>{inventory.category}</span></td>
                                            <td><span>{inventory.price}</span></td>
                                            <td><span>{inventory.supplier}</span></td>
                                            <td>
                                                <button onClick={() => handleEdit(inventory)} className='edit-save-btn'>Edit</button>
                                                <button onClick={() => handleDelete(inventory.id)} className='edit-back-btn'>Delete</button>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        }
                    </table>
                </div>}
                {edit &&
                    <div className='form-elements'>
                        <div className='dashboard-content-header'>
                            <h2>Edit Inventory Details</h2>
                        </div>
                        <div>
                            <form onSubmit={handleEditSubmit}>
                                <label htmlFor="">Inventory Id</label>
                                <br />
                                <input type="number" name="" id="" className='form-inputs' value={id} onChange={(e) => setId(e.target.value)} readOnly />
                                <br />
                                <label htmlFor="" className='form_label'>Name</label>
                                <br />
                                <input type="text" name="" id="" className='form-inputs' value={name} onChange={(e) => setName(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Quantity</label>
                                <br />
                                <input type="number" name="" id="" className='form-inputs' value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Category</label>
                                <br />
                                <input type="text" name="" id="" className='form-inputs' value={category} onChange={(e) => setCategory(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Price</label>
                                <br />
                                <input type="number" name="" id="" className='form-inputs' value={price} onChange={(e) => setPrice(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Supplier</label>
                                <br />
                                <input type="text" name="" id="" className='form-inputs' value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
                                <br />
                                <button type="submit" className='save-btn'>Save</button>
                                <button className='back-btn' onClick={handleBack}>Cancel</button>
                            </form>
                        </div>

                    </div>
                }
                {add &&
                    <div className='form-elements'>
                        <div className='dashboard-content-header'>
                            <h2>Add Inventory</h2>
                        </div>
                        <div>
                            <form onSubmit={handleAddSubmit}>
                                <label htmlFor="" className='form_label'>Name</label>
                                <br />
                                <input type="text" name="" id="" className='form-inputs' value={name} onChange={(e) => setName(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Quantity</label>
                                <br />
                                <input type="number" name="" id="" className='form-inputs' value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Category</label>
                                <br />
                                <input type="text" name="" id="" className='form-inputs' value={category} onChange={(e) => setCategory(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Price</label>
                                <br />
                                <input type="number" name="" id="" className='form-inputs' value={price} onChange={(e) => setPrice(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Supplier</label>
                                <br />
                                <input type="text" name="" id="" className='form-inputs' value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
                                <br />
                                <button type="submit" className='save-btn'>Save</button>
                                <button className='back-btn' onClick={handleBack}>Cancel</button>
                            </form>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default Inventory