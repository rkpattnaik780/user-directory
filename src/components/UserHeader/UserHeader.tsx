import { useState, useEffect } from "react";
import "./UserHeader.css";
import { useNavigate } from "react-router-dom";
import { CountriesURL } from "../../constant/constant";

const formatTimestamp = (timeZone: string) => {

    const date = new Date();

    const formattedTime = date.toLocaleTimeString("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    return formattedTime;

}

export const UserHeader = () => {

    const [countries, setCountries] = useState<any[]>();
    const [selectedCountry, setSelectedCountry] = useState<string>("Africa/Abidjan");
    const [currentTime, setCurrentTime] = useState<string>(formatTimestamp(selectedCountry));

    const [paused, setPaused] = useState<boolean>(false);

    useEffect(() => {
        fetch(CountriesURL).then(res => res.json()).then(res => {
            setCountries(res);
            setSelectedCountry(res[0]);
        });
    }, []);

    useEffect(() => {
        if(selectedCountry) {
            fetch(`${CountriesURL}/${selectedCountry}`).then(res => res.json()).then(data => {
                const formattedTime = formatTimestamp(selectedCountry);
                setCurrentTime(formattedTime);
            });
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (!paused) {
            const id = setInterval(() => {
                setCurrentTime((currTime) => {
                    const [hours, minutes, seconds] = currTime
                        .split(":")
                        .map(Number);
                    const newSeconds = (seconds + 1) % 60;
                    const newMinutes =
                        (minutes + Math.floor((seconds + 1) / 60)) % 60;
                    const newHours =
                        (hours + Math.floor((minutes + 1) / 60)) % 24;
                    return `${String(newHours).padStart(2, "0")}:${String(
                        newMinutes
                    ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
                });
            }, 1000);
            return () => clearInterval(id);
        }
    }, [paused]);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const handleCountryChange = (e: any) => {
        setSelectedCountry(e.target.value);
    }

    const toggleClock = () => {
        setPaused(!paused);
    }

    return (
        <div className="user-header">
            <div key="back-button">
                <button className="back-btn" onClick={goBack}>&#x2190;</button>
            </div>
            <div key="clock-options" className="clock-controls">
                <select 
                    className="country-dropdown"
                    onChange={handleCountryChange}
                >
                    {
                        countries?.map((country, index) => <option key={index}>{country}</option>)
                    }
                </select>
                <div className="clock">
                    {currentTime}
                </div>
                <button className="clock-toggle" onClick={toggleClock}>
                    {paused ? "Start" : "Pause"}
                </button>
            </div>
        </div>
    )
};