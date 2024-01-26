import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData, getWeatherData } from './api/index'

const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({});
    const [childSelected, setChildSelected] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}}) => {
            setCoords({lat: latitude, lng: longitude})
        }) 
    }, [])

    useEffect(() => {
        const newFilteredPlaces = places.filter((place) => Number(place.rating) > rating)
        setFilteredPlaces(newFilteredPlaces);
    }, [rating])

    useEffect(() => {
        if(bounds.sw && bounds.ne) {
        setIsLoading(true);
        getWeatherData(coords.lat, coords.lng)
            .then((data) => setWeatherData(data))
        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces({});
            })
        setIsLoading(false);
        }
    }, [type, bounds])

    return (
        <>
        <CssBaseline />
        <Header
            setCoords = {setCoords}
        />
        <Grid container spacing = {3} style = {{ width: '100%' }}>
            <Grid item xs = {12} md = {4}>
                <List 
                    places={filteredPlaces.length ? filteredPlaces : places}
                    childSelected = {childSelected}
                    isLoading = {isLoading}
                    type = {type}
                    setType = {setType}
                    rating = {rating}
                    setRating = {setRating}
                />
            </Grid>
            <Grid item xs = {12} md = {4}>
                <Map
                    setBounds = {setBounds}
                    setCoords = {setCoords}
                    coords = {coords}
                    places = {filteredPlaces.length ? filteredPlaces : places}
                    setChildSelected = {setChildSelected}
                    weatherData = {weatherData}
                />
            </Grid>
        </Grid>
        </>
    )
}

export default App;