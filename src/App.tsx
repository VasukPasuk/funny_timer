import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material";
import { MdEdit, MdNightlight, MdSunny } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";

const actions = [
  { icon: <MdNightlight size={20} />, name: 'Темна тема', theme: "dark" },
  { icon: <MdSunny size={20} />, name: 'Світла тема', theme: "light" },
];

type ThemeUnion = "light" | "dark";

type ThemeDictionaryType = {
  [key in ThemeUnion]: "warning" | "secondary";
};

const ThemeDictionary: ThemeDictionaryType = {
  light: "warning",
  dark: "secondary",
};

const BaseTimeValues1 = [300, 180, 60, 30];
const BaseTimeValues2 = [30, 60, 180, 300];

function App() {
  const [activeTimer, setActiveTimer] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(30);
  const [theme, setTheme] = useState<ThemeUnion>("light");
  const inited = useRef<boolean>(false);
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (activeTimer && currentTime > 0) {
      const timer = setInterval(() => {
        setCurrentTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
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

  const handleInputChange = (event: React.FormEvent<HTMLDivElement>, isMinutes: boolean) => {
    let value = event.currentTarget.innerText;

    if (!/^\d*$/.test(value)) {
      event.currentTarget.innerText = "00";
    }


    if (value.length !== 2) {
      event.currentTarget.innerText = "00";
    }

    const numericValue = Number(value);

    if (isMinutes) {
      setCurrentTime((prev) => (numericValue >= 0 && numericValue <= 59 ? numericValue * 60 + (prev % 60) : prev));
    } else {
      setCurrentTime((prev) => (numericValue >= 0 && numericValue <= 59 ? Math.floor(prev / 60) * 60 + numericValue : prev));
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("class", theme);
  }, [theme]);




  const formattedTime = formatTime(currentTime).split(":");

  return (
    <>
      <main className="max-h-dvh flex dark:bg-gray-950 flex-col justify-center items-center duration-700 transition-colors">
        <div className="flex dark:bg-gray-500/15 px-8 py-16 rounded-lg backdrop-blur-3xl flex-col justify-center items-center gap-8">
          <div className="flex flex-row">
            <Typography
              contentEditable
              suppressContentEditableWarning
              onInput={(event) => handleInputChange(event, true)}
              className="dark:text-blue-200 text-[16rem] outline-0 text-center"
            >
              {formattedTime[0]}
            </Typography>
            <Typography className="dark:text-blue-200 text-[16rem]">:</Typography>
            <Typography
              contentEditable
              suppressContentEditableWarning
              onInput={(event) => handleInputChange(event, false)}
              className="dark:text-blue-200 text-[16rem] outline-0 text-center"
            >
              {formattedTime[1]}
            </Typography>
          </div>
          <div className="flex gap-4">
            {BaseTimeValues1.map((value) => (
              <Button
                onClick={() => setCurrentTime((prev) => (prev - value < 0 ? 0 : prev - value))}
                key={value}
                variant="contained"
                color={ThemeDictionary[theme]}
              >
                {'-' + formatTime(value)}
              </Button>
            ))}
            {BaseTimeValues2.map((value) => (
              <Button
                onClick={() => {
                  setCurrentTime((prev) => prev + value);
                  inited.current = false;
                }}
                key={value}
                variant="contained"
                color={ThemeDictionary[theme]}
              >
                {formatTime(value)}
              </Button>
            ))}
          </div>
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="contained"
              onClick={() => setActiveTimer(() => !!currentTime)}
            >
              Почати
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setActiveTimer(false);
              }}
            >
              Зупинити
            </Button>
          </div>
          <audio ref={ref} src={`./memesong-${Math.floor(Math.random() * 31) + 1}.mp3`} />
        </div>
        <SpeedDial
          className="absolute bottom-6 right-6"
          ariaLabel="SpeedDial openIcon example"
          icon={<SpeedDialIcon openIcon={<MdEdit size={24} />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setTheme((prev) => action?.theme ? action.theme as ThemeUnion : prev)}
            />
          ))}
        </SpeedDial>
      </main>
    </>
  );
}

export default App;
