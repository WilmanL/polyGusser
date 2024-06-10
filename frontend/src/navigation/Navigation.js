import React from 'react';
import { Link } from 'react-router-dom';
import testImage from '../assests/test.jpg';
import polylogo from '../assests/polylogo.PNG'
import Avatar from '@mui/material/Avatar';

export default function Navigation() {
  return (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark mb-4" style={{backgroundColor:"#154734"}}>
            <Link to="/polyguesser/home" className="navbar-brand">
                <Avatar
                    src={polylogo}
                    onError={(e)=>{e.target.onerror = null; e.target.src=testImage}}
                    alt="polyguesser logo"
                    sx={{ width: 60, height: 60 }}
                />
            </Link>

            <button className="navbar-toggler" data-toggle="collapse" data-target="#responsive"><span className="navbar-toggler-icon"></span></button>

            <div className="collapse navbar-collapse" id="responsive">
                <ul className="navbar-nav mr-auto text-capitalize">
                    <li className="nav-item"><Link to="/polyguesser/home" className="nav-link active">home</Link></li>
                    <li className="nav-item"><Link to="/polyguesser/contextoGame" className="nav-link">game</Link></li>
                </ul>

                <form action="" className="form-inline ml-auto d-none d-md-block">
                    <input type="text" name="search" id="search" placeholder="Search" className="form-control form-control-sm" />
                </form>
                {/* <Link to="/notification" className="text-decoration-none" style={{color:"#CBE4F2", fontSize:"22px"}}><i className="far fa-bell ml-3 d-none d-md-block"></i></Link>  */}
                <img src={'https://picsum.photos/800/1000'} onError={(e)=>{e.target.onerror = null; e.target.src=testImage}} alt="" className="rounded-circle ml-3 d-none d-md-block" width="32" height="32" />
            </div>
        </nav>
    </div>
  );
}