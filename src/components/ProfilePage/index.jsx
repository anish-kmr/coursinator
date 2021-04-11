import React, { useState, useEffect, useContext } from 'react'
import {
    Avatar,
    Fab,
    TextField,
    Button
} from '@material-ui/core';

import { store } from 'react-notifications-component';
import AppContext from 'contexts/AppContext';
  

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import HandleIllegalRoutes from 'services/HandleIllegalRoutes';

import endpoints from 'endpoints.json'
import axios from 'axios';
import './profile_page.css'
const ProfilePage = () => {
    HandleIllegalRoutes();
    const { notificationOptions } = useContext(AppContext);
    let user = JSON.parse(localStorage.getItem('user'))
    const initialUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college || "",
        degree: user.degree || "",
        graduationYear: user.graduationYear || "",
        field: user.field || "",
        image: user.profile_picture || ""


    };
    let [updatedUser,setUpdatedUser] = useState(initialUser);
    let [imagePreview,setImagePreview]=useState("");
    let [editable,setEditable]=useState(false);
    const handleChange = (prop) => (event) => {
        setUpdatedUser({ ...updatedUser, [prop]: event.target.value });
    };
    const toggleEdit = () => {
        setEditable(!editable);
    };
    const handleImageUpload = (e)=>{
        if (e.target.files.length) {
          console.log(e.target.files)
          console.log(URL.createObjectURL(e.target.files[0]))
          setUpdatedUser({
            ...updatedUser,
            image: e.target.files[0]
            
          });
          setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
    }
    const saveProfile = ()=>{
        console.log('save profile ',updatedUser)
        let form = new FormData()
        for( let key in updatedUser ){
            form.append(key,updatedUser[key])
            console.table(key,updatedUser[key])
        }
        axios.post(endpoints.updateProfile,form)
        .then(res=>{
            if(res.data.updated){
                let localUser = JSON.parse(localStorage.getItem('user'));
                localUser = {...localUser,...res.data.values}
                localStorage.setItem('user',JSON.stringify(localUser))
                store.addNotification({...notificationOptions,
                    title:"Profile Updated",
                    message:"Your profile was updated successfully!",
                    type:"success"
                })
            }
            else{
                store.addNotification({...notificationOptions,
                    title:"Failed To Update Profile",
                    message:"Your profile was not updated ! Please Try later.",
                    type:"danger"
                })
            }

        })
        .catch(err=>{
            store.addNotification({...notificationOptions,
                title:"Network Error !",
                message:"There was some error updating the profile. Please try later",
                type:"danger"
            })
            console.log('err ',err)
        })
        toggleEdit();
    }
    return (
    <>
        <div className="profile _container">
            <div className="profile_navigation">
                <h2 className="profile_heading">My Profile</h2>
                <Fab variant="extended" size="medium"  color="primary" style={{width:'10rem'}} onClick={toggleEdit}>
                    {
                        editable?
                        <><CloseIcon style={{marginRight:'0.6rem',fontSize:'2rem'}} onClick={()=>{setUpdatedUser(initialUser)}} /> Close </> :
                        <><EditIcon style={{marginRight:'1rem',fontSize:'2rem'}} /> Edit </> 
                    }
                </Fab>
            </div>

            <div className="profile_card">
                <div className="profile_pic">
                    {
                        updatedUser.image ?
                        <img 
                            className="profile_img" 
                            src={imagePreview?imagePreview:updatedUser.image}
                            // src="https://firebasestorage.googleapis.com/v0/b/coursinator-62418.appspot.com/o/ml.png?alt=media&token=9155de80-e8fc-49a2-a7b2-39c53c6c5ab6" 
                        />:
                        <Avatar 
                            className="profile_img"
                            style={{
                                width:'20rem',
                                height:'20rem',
                                fontSize:'12rem',
                                backgroundColor:user.color,
                            }} 
                        >
                            {user.name && user.name.charAt(0).toUpperCase()}
                        </Avatar>

                    }
                    {
                        editable &&
                        <div className="change_pic" >
                            <Button component="label" variant="contained" color="secondary" >
                                Change Profile Pic
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload} 
                                    hidden
                                    />
                            </Button>
                            
                        </div>

                    }
                </div>
                <div className="profile_details">
                    <div className="user_name">
                        <TextField
                            id="name"
                            className="name_input"
                            value={updatedUser.name}
                            onChange={handleChange('name')}
                            InputProps={{
                                disableUnderline:true,
                                disabled:!editable,
                                style:{
                                    fontSize:'4rem',
                                    paddingLeft:'6rem',
                                    color:"#4f515b !important"
                                }
                            }}
                        />    
                    </div>
                    
                    <div className="detail">
                        <label htmlFor="email"> Email :  </label>
                        <TextField
                            id="email"
                            value={updatedUser.email}
                            onChange={handleChange('email')}
                            InputProps={{
                                disabled:!editable,
                                style:{
                                    fontSize:'2rem',
                                    padding:'.25rem 1rem'
                                }
                            }}
                        />
                    </div>
                    <div className="detail">
                        <label htmlFor="college"> College :  </label>
                        <TextField
                            id="college"
                            value={updatedUser.college}
                            
                            onChange={handleChange('college')}
                            InputProps={{
                                disabled:!editable,
                                style:{
                                    fontSize:'2rem',
                                    padding:'.25rem 1rem'
                                }
                            }}
                        />
                    </div>
                    <div className="detail">
                        <label htmlFor="degree"> Degree(pursuing*) :  </label>
                        <TextField
                            id="degree"
                            value={updatedUser.degree}
                            onChange={handleChange('degree')}
                            InputProps={{
                                disabled:!editable,
                                style:{
                                    fontSize:'2rem',
                                    padding:'.25rem 1rem'
                                }
                            }}
                        />
                    </div>
                    <div className="detail">
                        <label htmlFor="graduationYear"> Year of Graduation :  </label>
                        <TextField
                            id="graduationYear"
                            value={updatedUser.graduationYear}
                            onChange={handleChange('graduationYear')}
                            InputProps={{
                                type:'number',
                                disabled:!editable,
                                style:{
                                    fontSize:'2rem',
                                    padding:'.25rem 1rem'
                                }
                            }}
                        />
                    </div>
                    <div className="detail">
                        <label htmlFor="field"> Field of Study :  </label>
                        <TextField
                            id="field"
                            value={updatedUser.field}
                            onChange={handleChange('field')}
                            InputProps={{
                                disabled:!editable,
                                style:{
                                    fontSize:'2rem',
                                    padding:'.25rem 1rem'
                                }
                            }}
                        />
                    </div>
                </div>

            </div>
            {
                editable &&
                <div className="save_btn_container">
                    <Button variant="contained" color="primary" className="save_btn" onClick={saveProfile}>
                        Save Profile
                    </Button>
                </div>
            }
        </div>
    </>
    )
}
 
export default ProfilePage