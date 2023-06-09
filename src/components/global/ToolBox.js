import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeMutations } from "../../redux/mutations";
import languages from './languages';

import Calendar from 'react-calendar';

import './ToolBox.scss';

const Tools = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const language = useSelector(state => state.language.language);
  const translations = languages[language];

  const clickHandler = () => {
    setIsMenuShown(!isMenuShown);
  };

  let menuRef = useRef();

  useEffect(() => {
    let mouseHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsMenuShown(false);
      }
    };

    let keyboardHandler = (e) => {
      if (e.key === "Escape") {
        setIsMenuShown(false);
      }
    }

    document.addEventListener('mousedown', mouseHandler);
    document.addEventListener('keydown', keyboardHandler);

    return () => {
      document.removeEventListener('mousedown', mouseHandler);
      document.removeEventListener('keydown', keyboardHandler);
    }
  });

  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);

  const toggleTheme = () => {
    const newThemeMode = mode === 'dark-mode' ? '' : 'dark-mode';
    dispatch(themeMutations.setTheme(newThemeMode));
    setIsMenuShown(false);
  };

  const [isCalendarShown, setIsCalendarShown] = useState(false);
  useEffect(() => {
    let mouseHandler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsCalendarShown(false);
      }
    };

    let keyboardHandler = (e) => {
      if (e.key === "Escape") {
        setIsCalendarShown(false);
      }
    }

    document.addEventListener('mousedown', mouseHandler);
    document.addEventListener('keydown', keyboardHandler);

    return () => {
      document.removeEventListener('mousedown', mouseHandler);
      document.removeEventListener('keydown', keyboardHandler);
    }
  });

  let calendarRef = useRef();

  return (
    <div className={`fixed-item ${language === 'ar' ? 'fixed-item-arabic' : ''} tool-box flex-col-right-start`} ref={menuRef}>
      {isCalendarShown &&
        <div className="calendar-container margin-12px-V" ref={calendarRef}>
          <Calendar />
        </div>
      }
      {isMenuShown &&
        <div className="tool-box--btns flex-col-center">
          <div className='tool-box--btn flex-row-center orange-bg pointer radius-circular margin-4px-V shadow-5px'>
            <i className={`bi bi-stickies ${mode === 'dark-mode' ? 'gray' : 'white'} size-22px`} />
            <div className={`tool-box--btn--${language==='ar' ? 'tag-arabic':'tag'}  flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
              {translations.notes}
            </div>
          </div>
          <div className='tool-box--btn flex-row-center orange-bg pointer radius-circular margin-4px-V shadow-5px' onClick={toggleTheme}>
            <i className={mode === 'dark-mode' ? 'bi bi-moon gray size-26px' : 'bi bi-sun white size-26px'} />
            <div className={`tool-box--btn--${language==='ar' ? 'tag-arabic':'tag'} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
              {translations.theme}
            </div>
          </div>
          <div className='tool-box--btn flex-row-center orange-bg pointer radius-circular margin-4px-V shadow-5px'
            onClick={() => {
              setIsCalendarShown(true)
              setIsMenuShown(false)
            }}>
            <i className={`bi bi-calendar4-week ${mode === 'dark-mode' ? 'gray' : 'white'} size-22px`} />
            <div className={`tool-box--btn--${language==='ar' ? 'tag-arabic':'tag'} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
              {translations.result}
            </div>
          </div>
        </div>
      }
      <div onClick={clickHandler} className={`${isMenuShown ? 'gray-bg white' : `orange-bg ${mode === 'dark-mode' ? 'gray' : 'white'}`} tool-box--btn flex-row-center pointer radius-circular shadow-5px`}>
        <i className={isMenuShown ? 'bi bi-x size-34px' : 'bi bi-columns-gap size-22px'} />
        <div className={`tool-box--btn--${language==='ar' ? 'tag-arabic':'tag'} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          {isMenuShown ? translations.close : translations.tools}
        </div>
      </div>
    </div>
  );
}

export default Tools;
