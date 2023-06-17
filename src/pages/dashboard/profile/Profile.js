import React, { useState } from 'react';

import ChangeInfo from '../../../components/profile/ChangeInfo';
import ChangePassword from '../../../components/profile/ChangePassword';
import Canvas from '../../../components/common/Canvas';

import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../../apis/actions';

import { useEffect } from 'react';

import './Profile.scss';

const Profile = () => {
    const userData = useSelector((state) => state.auth.userData);
    const [adminIMG, setAdminIMG] = useState(userData.img);
    const [editIMG, setEditIMG] = useState(false);

    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        document.title = 'Profile • Store panel';
    }, []);

    const dispatch = useDispatch();

    const uploadImg = async (e) => {
        setEditIMG(true);
        const data = new FormData();
        data.append('path', 'admin/profile');
        data.append('file', e.target.files[0]);

        dispatch(authActions.changeProfileImage(data, (response) => {
            setAdminIMG('http://143.244.196.79:4012/api/file-manager/' + response.data.data);
        }))
    }

    const handleChangeIMG = async () => {
        dispatch(authActions.editProfile({
            _id: userData._id,
            img: adminIMG,
        }, () => setEditIMG(false)));
    }

    const handleCancelIMG = () => {
        setAdminIMG(userData.img);
        setEditIMG(false);
    }

    return (
        <div className="profile full-width" >
            <div className="profile--braud-cramb inter gray size-16px font-bold">
                Profile
            </div>
            <div className='full-width flex-col-top-start'>
                <div className='profile--content width-70-100 flex-col-top-start'>
                    <div className='profile--img flex-col-center radius-circular'>
                        {adminIMG === 'NO IMAGE' ?
                            <Canvas name={userData.name} borderRadius='50%' width={55} height={55} fontSize={'42px'} /> :
                            <img src={adminIMG} className='white-bg' alt='' />
                        }
                    </div>
                    <div className='profile--change-img flex-row-center radius-circular'>
                        <label className='full-width size-16px' htmlFor='profile-picture'>
                            <div className='full-width profile--change-img--tag flex-row-center white-bg gray open-sans pointer'>
                                <i className="bi bi-camera size-16px margin-4px-H" />
                                Change Picture
                                <input type="file" id='profile-picture' onChange={uploadImg} />
                            </div>
                        </label>
                    </div>
                    {editIMG &&
                        <>
                            <button
                                className={`profile--btn shadow-2px width-50-100 ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg font-bold size-20px pointer margin-12px-V`}
                                onClick={handleChangeIMG}
                            >Save</button>
                            <button
                                className={`profile--btn shadow-2px width-50-100 ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg font-bold size-20px pointer`}
                                onClick={handleCancelIMG}
                            >Cancel</button>
                        </>
                    }

                    <ChangeInfo />

                    <ChangePassword />
                </div>

            </div >
        </div >
    )
}

export default Profile;