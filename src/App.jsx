import React from "react";
import './App.css';
import bell from './assets/bell-regular.svg';
import PopUp from "./PopUp";
import {useDispatch, useSelector} from "react-redux";
import {removeData, setNewNotice, setReaded} from "./store/notice";

function App() {
  const dispatch = useDispatch();
  const [newNoticeValue, setNewNoticeValue] = React.useState('');
  const [isNoticeOpen, setIsNoticeOpen] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const noticeData = useSelector((state) => state.notice.noticeData)

  const sayHi = () => {
    let isOpen = isNoticeOpen;
    const notice = {
      text: 'hi',
      readed: isOpen
    }
    dispatch((setNewNotice(notice)));
  }

  React.useEffect(() => {
    setInterval(() => sayHi(), 10000);
  }, [])

  React.useEffect(() => {
    let count = noticeData.reduce((sum, el) => !el.readed ? sum +1 : sum, 0);
    setCounter(count)
  }, [noticeData])

  React.useEffect(() => {
    if(isNoticeOpen) {
      dispatch(setReaded())
    }
  }, [isNoticeOpen])

  const onNewNotice = (ev) => {
    ev.preventDefault()
    if(newNoticeValue) {
      const notice = {
        text: newNoticeValue,
        readed: isNoticeOpen
      }
      dispatch((setNewNotice(notice)));
      setNewNoticeValue('');
    }
  }

  const onSetReaded = () => {
    dispatch(setReaded())
  }
  const onRemove = () => {
    dispatch((removeData()))
  }
  const onTogglePopUp = () => {
    setIsNoticeOpen(!isNoticeOpen);
  }

  return (
      <div className="app">
        <header className="app-header">
          <h3> Шапка </h3>
          <button
              className="app-notice-btn"
              onClick={() => onTogglePopUp()}
          >
            <img
                className="app-bell"
                src={bell}
                alt="icon-bell"
            />
            {counter !== 0 &&
              <div className="app-notice-counter">
                {counter}
              </div>
            }
          </button>
          { isNoticeOpen && <PopUp/> }
        </header>
        <main>
          <form className="app-input-box">
            <input
                type="text"
                placeholder="Введите название события"
                value={newNoticeValue}
                onChange={(event) => setNewNoticeValue(event.target.value)}
            />
            <button
                className="app-input-btn"
                onClick={(ev) => onNewNotice(ev)}
            >
              Отправить
            </button>
          </form>
          <div className="app-btn-box">
            <button
                className="app-btn"
                onClick={() => onSetReaded()}
            > Пометить всё прочитанным </button>
            <button
                className="app-btn"
                onClick={() => onRemove()}
            > Удалить все события </button>
            <button
                className="app-btn"
                onClick={() => onTogglePopUp()}
            > Скрыть/показать попап </button>
          </div>
        </main>
      </div>
  );
}

export default App;
