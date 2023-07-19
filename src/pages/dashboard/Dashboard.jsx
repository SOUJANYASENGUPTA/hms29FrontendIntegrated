import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
const Dashboard=()=>{
    const [patients, setPatients] = useState([]);
    const [staff, setStaff] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [inventory, setInventories] = useState([]);
	const[records,setRecords]=useState([])
    const fetchPatients = async () => {
        await axios.get('http://localhost:8080/patient').then((response) => {
            setPatients(response.data);
        }).catch((err)=>{

        })
        
    }
    const fetchstaffs = async () => {
        await axios.get('http://localhost:8080/staff').then((response) => {
            setStaff(response.data);
        }).catch((err)=>{

        })
    }
    const fetchAppointments = async () => {
        await axios.get('http://localhost:8080/appointment').then((response) => {
          setAppointments(response.data);
        }).catch((err)=>{

        })
      };
      const fetchinventories = async () => {
        await axios.get('http://localhost:8080/inventory').then((response) => {
            setInventories(response.data);
        }).catch((err)=>{
            
        })
    }
	const fetchMedicalrecords=async()=>{
		await axios.get('http://localhost:8080/medical-records').then((response)=>{
			setRecords(response.data)
		}).catch((err)=>{

		})
	}
    useEffect(() => {
        fetchPatients();
        fetchstaffs();
        fetchAppointments();
        fetchinventories();
		fetchMedicalrecords();
    }, [])
    const pl = patients.length;
    const sl = staff.length;
    const al = appointments.length;
    const il = inventory.length;
	const rl=records.length;
   return(
        <div>
            <div className="dashboard">
	   <main className="content-wrap">
		<header className="content-head">
			<h1>Welcome to HMS29</h1>

		</header>
		
		<div className="content">
			<section className="info-boxes">
				<div className="info-box">
					<div className="box-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 20V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-2-1H5V5h14v14z"/><path d="M10.381 12.309l3.172 1.586a1 1 0 0 0 1.305-.38l3-5-1.715-1.029-2.523 4.206-3.172-1.586a1.002 1.002 0 0 0-1.305.38l-3 5 1.715 1.029 2.523-4.206z"/></svg>
					</div>
					
					<div className="box-content">
						<span className="big">{pl}</span>
						No of Patients
					</div>
				</div>
				
				<div className="info-box">
					<div className="box-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 10H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1zm-1 10H5v-8h14v8zM5 6h14v2H5zM7 2h10v2H7z"/></svg>
					</div>
					
					<div className="box-content">
						<span className="big">{sl}</span>
						No.of staffs
					</div>
				</div>
				
				<div className="info-box active">
					<div className="box-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3,21c0,0.553,0.448,1,1,1h16c0.553,0,1-0.447,1-1v-1c0-3.714-2.261-6.907-5.478-8.281C16.729,10.709,17.5,9.193,17.5,7.5 C17.5,4.468,15.032,2,12,2C8.967,2,6.5,4.468,6.5,7.5c0,1.693,0.771,3.209,1.978,4.219C5.261,13.093,3,16.287,3,20V21z M8.5,7.5 C8.5,5.57,10.07,4,12,4s3.5,1.57,3.5,3.5S13.93,11,12,11S8.5,9.43,8.5,7.5z M12,13c3.859,0,7,3.141,7,7H5C5,16.141,8.14,13,12,13z"/></svg>
					</div>
					
					<div className="box-content">
						<span className="big">{al}</span>
						Appointments booked
					</div>
				</div>
				<div className="info-box">
					<div className="box-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 20V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-2-1H5V5h14v14z"/><path d="M10.381 12.309l3.172 1.586a1 1 0 0 0 1.305-.38l3-5-1.715-1.029-2.523 4.206-3.172-1.586a1.002 1.002 0 0 0-1.305.38l-3 5 1.715 1.029 2.523-4.206z"/></svg>
					</div>
					
					<div className="box-content">
						<span className="big">{rl}</span>
						Total Medical Records
					</div>
				</div>
				<div className="info-box">
					<div className="box-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3C6.486 3 2 6.364 2 10.5c0 2.742 1.982 5.354 5 6.678V21a.999.999 0 0 0 1.707.707l3.714-3.714C17.74 17.827 22 14.529 22 10.5 22 6.364 17.514 3 12 3zm0 13a.996.996 0 0 0-.707.293L9 18.586V16.5a1 1 0 0 0-.663-.941C5.743 14.629 4 12.596 4 10.5 4 7.468 7.589 5 12 5s8 2.468 8 5.5-3.589 5.5-8 5.5z"/></svg>
					</div>
					
					<div className="box-content">
						<span className="big">{il}</span>
						Meds in Stock
					</div>
				</div>
			</section>
		
			<section className="person-boxes">
				
				<div className="person-box">
					<div className="box-avatar">
						<img src="https://images.unsplash.com/photo-1495147334217-fcb3445babd5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=35fc38ccdb26717006d7b48f79a2bb83&auto=format&fit=crop&w=140&q=80" alt="Robert Smaghi, Chairman"/>
					</div>
					
					<div className="box-bio">
						<h2 className="bio-name">Robert Smaghi</h2>
						<p className="bio-position">Chairman</p>
					</div>
					
				</div>
				
				
				<div className="person-box">
					<div className="box-avatar">
						<img src="https://images.unsplash.com/photo-1511019621063-1bd36feaece2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e81c3e03912567cee323dc6993f88fe4&auto=format&fit=crop&w=140&q=80" alt="Nathalie Mestralet, Head of Trading"/>
					</div>
					
					<div className="box-bio">
						<h2 className="bio-name">Nathalie Mestralet</h2>
						<p className="bio-position">Head of Administration</p>
					</div>
					
					
				</div>
				
				<div className="person-box">
					<div className="box-avatar">
						<img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=140&q=80" alt="Alexandra Johnson, Head of Human Resources"/>
					</div>
					
					<div className="box-bio">
						<h2 className="bio-name">Alexandra Johnson</h2>
						<p className="bio-position">Head of Human Resources</p>
					</div>
					
					
				</div>
				
				<div className="person-box">
					<div className="box-avatar">
						<img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c90ef12b4dc22a4a4c277dd056dd0b7e&auto=format&fit=crop&w=140&q=80" alt="Herve De Rinel, Head of International"/>
					</div>
					
					<div className="box-bio">
						<h2 className="bio-name">Herve De Rinel</h2>
						<p className="bio-position">Head Technician</p>
					</div>
				</div>
			</section>
		</div>
	</main>
</div>
        </div>
   )
}
export default Dashboard;