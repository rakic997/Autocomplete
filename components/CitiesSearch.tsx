import { useState, useEffect, useRef } from 'react';
import citiesData from '../citiesData.json';

export default function CitiesSearch(): JSX.Element {
    const [value, setValue] = useState<string>("");
    const [cities] = useState<string[]>(citiesData);
    const [searchedCities, setSearchedCities] = useState<string[]>([]);
    const [dropdown, setDopdown] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        searchRef.current?.focus();
    }, [])

    function handleValue(e: { target: { value: string; }; }) {
        const value = e.target.value.toLowerCase();
        setValue(value);

        if (value.length > 2) {
            filterCities();
            setDopdown(true);
        }
    }

    function filterCities() {
        setSearchedCities(prevCities => cities.filter((city: string) => city.includes(value)));
    }

    function chooseCitie(citie: string) {
        setValue(citie);
        setDopdown(prevDropdown => !prevDropdown);
    }

    function clearValue() {
        setValue("");
        searchRef.current?.focus();
    }

    const citiesNotFound = value.length > 2 && searchedCities.length === 0;
    const citiesFound = value.length > 2 && searchedCities.length !== 0;
    const notEnoughChar = value.length >= 1 && value.length < 3;

    return (
        <div className="search cities-search">
            <div className='input-container'>
                <input
                    type='text'
                    name='cities'
                    placeholder='Search for cities...'
                    onChange={handleValue}
                    value={value}
                    ref={searchRef}
                />
                {value.length >= 3 && <span className='clear' onClick={clearValue}>x</span>}
            </div>
            {notEnoughChar && <h6 className='prompt-text'>Type at least 3 characters</h6>}
            {citiesFound ?
                <ul className={dropdown ? 'cities-dropdown open' : 'cities-dropdown'}>
                    {searchedCities?.map((citie: string) => {
                        return (
                            <li key={citie} onClick={() => chooseCitie(citie)}>{citie}</li>
                        )
                    })}
                </ul> : null}
            {citiesNotFound && <h6 className='prompt-text'>There are no cities starting with those characters!</h6>}
        </div>
    )
}