import React, { useEffect, useState } from 'react';
import ListsCard from '../../../components/common/ListsCard';
import { useDispatch, useSelector } from 'react-redux';
import languages from '../../../components/global/languages';
import Loading from '../../../components/global/Loading';
import { logActivityMutations } from '../../../redux/mutations';
import { authActions, logActivityActions } from '../../../apis/actions';

import './LogActivity.scss';
import LogActivityCard from '../../../components/logActivity/LogActivityCard';

const LogActivity = () => {
  const language = useSelector(state => state.language.language);
  const translate = languages[language];
  const dispatch = useDispatch();
  const logs = useSelector(state => state.log.logs);
  const userData = useSelector(state => state.auth.userData);

  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    document.title = 'Log Activity • Store Panel';

    dispatch(authActions.getProfile());
    dispatch(logActivityMutations.setLogs(null));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    }

    window.addEventListener('scroll', handleScroll);

    setIsLoading(true);
    setShowLoading(true);

    dispatch(logActivityActions.getLogs(userData._id, offset)).then(() => {
      setIsLoading(false);
      setShowLoading(false);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, offset, userData._id]);

  let content = (
    <>
      {
        (logs !== null && logs.length === 0) ? (
          <div className='gray inter size-16px font-bold'>No logs found</div>
        ) : (logs !== null && logs.length > 0) ? (
          <>
            <div className='log-activity--list-header full-width flex-row-left-start margin-2px-V'>
              <div className='width-25-100 flex-row-left-start font-bold size-14px'>{translate.name}</div>
              <div className='width-50-100 flex-row-left-start font-bold size-14px'>{translate.action}</div>
              <div className='width-25-100 flex-row-left-start font-bold size-14px'>{translate.timeStamp}</div>
            </div>
            {logs.map((log) => {
              return (
                <ListsCard key={log._id} width={'full-width'}>
                  <LogActivityCard log={log} />
                </ListsCard>
              )
            })}
            {showLoading && <Loading />}
          </>
        ) : (
          <Loading />
        )
      }

      {isLoading && !showLoading && <Loading />}
    </>
  );

  return (
    <div className="log-activity full-width" >
      <div className="log-activity--braud-cramb gray inter size-16px font-bold">
        {translate.logActivity}
      </div>

      <div className='flex-col-left-start full-width inter gray margin-12px-V'>
        {content}
      </div>
    </div>
  )
}


export default LogActivity;