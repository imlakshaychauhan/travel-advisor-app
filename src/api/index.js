import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
export const getPlacesData = async (sw, ne) => {
    try {
        const {data: {data}} = await axios.get(URL, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
              },
              headers: {
                'X-RapidAPI-Key': '4301735828msh6b8042efc41e02ep1bd7cajsn7b8c622701e0',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        });
        return data;
    } catch(err) {
        console.log(err);
    }
}