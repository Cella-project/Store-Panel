import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../global/Loading';

import { notificationMutations } from '../../redux/mutations';
import { notificationActions } from '../../apis/actions';
import PerfectScrollbar from 'react-perfect-scrollbar';

import languages from '../global/languages';

import './Notifications.scss';

const Notifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification.notifications);
    const userData = useSelector(state => state.auth.userData);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const [notificationsShown, setNotificationsShown] = useState(false);

    const mode = useSelector(state => state.theme.mode);

    let menuRef = useRef();

    useEffect(() => {
        let mouseHandler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setNotificationsShown(false);
            }
        };

        let keyboardHandler = (e) => {
            if (e.key === "Escape") {
                setNotificationsShown(false);
            }
        }

        document.addEventListener('mousedown', mouseHandler);
        document.addEventListener('keydown', keyboardHandler);

        return () => {
            document.removeEventListener('mousedown', mouseHandler);
            document.removeEventListener('keydown', keyboardHandler);
        }
    });

    const getTimeSinceCreation = (createdAt) => {
        const notificationDate = new Date(createdAt);
        const currentDate = new Date();

        const timeDiff = currentDate.getTime() - notificationDate.getTime();
        const secondsDiff = Math.floor(timeDiff / 1000);
        const minutesDiff = Math.floor(secondsDiff / 60);
        const hoursDiff = Math.floor(minutesDiff / 60);
        const daysDiff = Math.floor(hoursDiff / 24);

        if (language === 'en') {
            if (daysDiff >= 10) {
                return notificationDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            } else if (daysDiff >= 1) {
                return `${daysDiff} ${daysDiff === 1 ? translate.day : translate.days} ${translate.ago}`;
            } else if (hoursDiff >= 1) {
                return `${hoursDiff} ${hoursDiff === 1 ? translate.hour : translate.hours} ${translate.ago}`;
            } else if (minutesDiff >= 1) {
                return `${minutesDiff} ${minutesDiff === 1 ? translate.minute : translate.minutes} ${translate.ago}`;
            } else {
                return `${secondsDiff} ${secondsDiff === 1 ? translate.second : translate.seconds} ${translate.ago}`;
            }
        } else if (language === 'ar') {
            if (daysDiff >= 10) {
                return notificationDate.toLocaleDateString('ar-EG', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            } else if (daysDiff >= 1) {
                return `${translate.ago} ${daysDiff} ${daysDiff === 1 ? translate.day : translate.days}`;
            } else if (hoursDiff >= 1) {
                return `${translate.ago} ${hoursDiff} ${hoursDiff === 1 ? translate.hour : translate.hours}`;
            } else if (minutesDiff >= 1) {
                return `${translate.ago} ${minutesDiff} ${minutesDiff === 1 ? translate.minute : translate.minutes}`;
            } else {
                return `${translate.ago} ${secondsDiff} ${secondsDiff === 1 ? translate.second : translate.seconds}`;
            }
        }
    }

    const handleRead = (id) => {
        dispatch(notificationActions.setNotificationAsRead(id));
    }

    const handleReadAll = (userId) => {
        dispatch(notificationActions.setAllNotificationsAsRead(userId)).then(() => {
            setOffset(0);
        });
    }

    const handleScroll = (e) => {
        if (e.scrollTop + e.clientHeight >= e.scrollHeight) {
            setOffset(prevOffset => prevOffset + 10);
        }
    };

    useEffect(() => {
        if (offset > 0) {
            setLoading(true);
            dispatch(notificationActions.getAllNotifications(offset)).then(() => {
                setLoading(false);
            });
        }
    }, [offset, dispatch]);

    useEffect(() => {
        if (notificationsShown) {
            setLoading(true);
            dispatch(notificationMutations.setNotifications(null));
            dispatch(notificationActions.getAllNotifications(0)).then(() => {
                setLoading(false);
            });
        } else {
            dispatch(notificationMutations.setNotifications(null));
            dispatch(notificationActions.getAllNotifications(0));
            setOffset(0);
        }
    }, [notificationsShown, dispatch]);

    const unReadNotifications = notifications?.filter(notification => !notification.isRead).length;

    let content = (loading || !notifications) && <Loading />;

    if (notifications !== null) {
        if (notifications.length === 0) {
            content =
                <div className='full-width flex-row-center'>
                    <p className={`space-none pt-sans ${mode === 'dark-mode' ? 'gray' : 'gray'}`}>{translate.noNotifications}</p>
                </div>
        } else if (notifications.length > 0) {
            content =
                <>
                    {notifications.map((notification) => {
                        return (
                            <div key={notification._id} className={`notifications--menu--item ${mode === 'dark-mode' ? 'dark' : ''} full-width flex-row-between open-sans`}>
                                <div className='notifications--icon flex-row-center'>
                                    <i className={`bi bi-bell ${mode === 'dark-mode' ? 'gray' : 'gray'} size-30px`} />
                                </div>
                                <div className='full-width flex-col-left-start'>
                                    <div className='full-width flex-row-between'>
                                        <div className={`notifications--menu--item--subject ${!notification.isRead ? 'font-bold' : ''} flex-row-center size-18px pt-sans`}>
                                            <p className={`space-none pt-sans ${mode === 'dark-mode' ? 'gray' : 'gray'}`}>{notification.subject}</p>
                                        </div>
                                        <div className={`notifications--menu--item--date flex-row-center ${!notification.isRead ? 'font-bold' : ''} size-12px inter`}>
                                            <p className={`space-none pt-sans baby-blue`}>
                                                {getTimeSinceCreation(notification.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='full-width flex-row-between'>
                                        <div className={`notifications--menu--item--body flex-row-left-start ${!notification.isRead ? 'font-bold' : ''} size-14px`}>
                                            <p className={`space-none pt-sans ${mode === 'dark-mode' ? 'gray' : 'gray'}`}>{notification.body}</p>
                                        </div>
                                        {!notification.isRead &&
                                            <div className='notifications--menu--item--read flex-row-center pointer' onClick={() => handleRead(notification._id)}>
                                                <p className='space-none pt-sans size-12px'>{translate.markAsRead}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    {loading && <Loading />}
                </>
        }
    }

    return (
        <div ref={menuRef} className='notifications flex-row-center radius-15px margin-6px-H white-bg shadow-2px'>
            <div className='notifications--icon flex-row-center pointer full-width' onClick={setNotificationsShown.bind(null, !notificationsShown)} >
                {unReadNotifications > 0 && !notificationsShown &&
                    <div className={`notifications--unread inter shadow-5px ${mode === 'dark-mode' ? 'gray' : 'white'} font-bold red-bg size-10px flex-row-center`}>
                        {unReadNotifications >= 10 ? '9+' : unReadNotifications}
                    </div>
                }
                <i className={`bi bi-bell${notificationsShown ? '-fill' : ''} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-22px`} />
                <div className={`notifications--icon--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
                    {translate.notifications}
                </div>
            </div>
            {notificationsShown &&
                <div className={`notifications--menu${language === 'ar' ? '--ar' : ''} flex-col-center white-bg radius-15px`}>
                    <div className='notifications--menu--header full-width flex-row-between'>
                        <h2 className={`space-none pt-sans`}>{translate.notifications}</h2>
                        {unReadNotifications > 0 &&
                            <div className='notifications--menu--item--read flex-row-center pointer' onClick={() => handleReadAll(userData._id)}>
                                <p className='space-none pt-sans size-12px'>{translate.markAllAsRead}</p>
                            </div>
                        }
                    </div>
                    <PerfectScrollbar className={`notifications--scroll-cont full-width ${loading ? 'loading' : ''}`} onScrollY={handleScroll}>
                        {content}
                    </PerfectScrollbar>
                </div>
            }
        </div>
    )
}

export default Notifications;