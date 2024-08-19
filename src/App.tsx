import {Button, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {MdEdit, MdNightlight, MdSunny} from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import {useState} from "react";

const actions = [
  { icon: <MdAddTask size={20}/>, name: 'Створити' },
  { icon: <MdNightlight size={20}/>, name: 'Темна тема' , theme: "dark"},
  { icon: <MdSunny size={20}/>, name: 'Світла тема' , theme: "light"},
];

type ThemeUnion = "light" | "dark";

type ThemeDictionaryType = {
  [key in ThemeUnion]: "warning" | "secondary";
};

const ThemeDictionary:ThemeDictionaryType = {
  light: "warning",
  dark: "secondary"
}

const BaseTimeValues = ["-5:00", "-3:00", "-1:00", "+1:00", "+1:00", "+3:00", "+5:00"]

function App() {
  const [activeTimer, setActiveTimer] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeUnion>("light");



  return (
    <>
      <main className={"max-h-dvh flex flex-col justify-center items-center"}>
        <div className={"flex gap-6"}>
          {!(activeTimer) && <div className={"flex gap-4"}>
            {BaseTimeValues.map((value, _) => (
              <Button key={value} variant={"contained"} color={ThemeDictionary[theme]}>{value}</Button>
            ))}
	        </div>}
          <Button>

          </Button>
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

export default App
