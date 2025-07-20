import { Moon, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';


const ThemeToggle = ({size=28}) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme : 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div>
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    onChange={handleToggle}
                    checked={theme === 'dark'}
                    className="theme-controller"
                    value="dark"
                />
                <div className="swap-off text-yellow-600">
                    <SunMedium size={size}/>
                </div>
                <div className="swap-on">
                    <Moon size={size}/>
                </div>
            </label>
        </div>
    );
};

export default ThemeToggle;