import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material";
import { MdEdit, MdNightlight, MdSunny } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import {useEffect, useRef, useState} from "react";

const actions = [
  { icon: <MdAddTask size={20} />, name: 'Створити' },
  { icon: <MdNightlight size={20} />, name: 'Темна тема', theme: "dark" },
  { icon: <MdSunny size={20} />, name: 'Світла тема', theme: "light" },
];

type ThemeUnion = "light" | "dark";

type ThemeDictionaryType = {
  [key in ThemeUnion]: "warning" | "secondary";
};

const ThemeDictionary: ThemeDictionaryType = {
  light: "warning",
  dark: "secondary"
}

const BaseTimeValues1 = [300, 180, 60, 30];
const BaseTimeValues2 = [30, 60, 180, 300];

function App() {
  const [activeTimer, setActiveTimer] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [theme, setTheme] = useState<ThemeUnion>("light");
  const ref = useRef(null);

  useEffect(() => {
    if (activeTimer && currentTime > 0) {
      const timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime > 0 ? prevTime - 1 : prevTime);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else if (currentTime <= 0) {
      setActiveTimer(false);
      ref.current.play()
    }
  }, [activeTimer, currentTime]);


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      <main className={"max-h-dvh flex flex-col justify-center items-center"}>
        <div className={"flex flex-col justify-center items-center gap-8"}>
          <div>
            <Typography variant={"h1"}>
              {formatTime(currentTime)}
            </Typography>
          </div>
          <div className={"flex gap-4"}>
            {BaseTimeValues1.map((value) => (
              <Button onClick={() => setCurrentTime(prev => (prev - value) < 0 ? prev : prev - value)} key={value} variant={"contained"} color={ThemeDictionary[theme]}>{'-' + formatTime(value)}</Button>
            ))}
            {BaseTimeValues2.map((value) => (
              <Button onClick={() => setCurrentTime(prev => prev + value)} key={value} variant={"contained"} color={ThemeDictionary[theme]}>{formatTime(value)}</Button>
            ))}
          </div>
          <div className={"flex justify-center items-center gap-6"}>
            <Button variant={"contained"} onClick={() => setActiveTimer(() => !!currentTime)}>
              Почати
            </Button>
            <Button variant={"outlined"} onClick={() => setActiveTimer(false)}>
              Зупинити
            </Button>
          </div>
          <audio ref={ref} src={`./memesong-${Math.floor(Math.random() * 11) + 1}.mp3`}/>
        </div>
        <SpeedDial
          className={"absolute bottom-6 right-6"}
          ariaLabel="SpeedDial openIcon example"
          icon={<SpeedDialIcon openIcon={<MdEdit size={24} />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setTheme(prev => action?.theme ? action.theme as ThemeUnion : prev)}
            />
          ))}
        </SpeedDial>
      </main>
    </>
  )
}

export default App;
