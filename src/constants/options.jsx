export const SelectTravelList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'+',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travelers in tandem',
        icon:'🥂',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'Family time and bonding',
        icon:'🧑🏻‍👩🏼‍👦🏼',
        people:'3 to 5 people'
    },
    {
        id:2,
        title:'Group Adventure',
        desc:'Thrill seeking',
        icon:'🏕️',
        people:'6 to 10 people'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Saty concious of costs',
        icon:"🪙"
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep costs on the average side',
        icon:"💰"
    },
    {
        id:3,
        title:'Luxury',
        desc:'Money is no problem',
        icon:"💷"
    },
]

export const AI_Prompt ='Generate a plan for Location: {location} for {totalDays} days,for {traveler} with a {budget} budget. Give me a hotels option list with Hotelname,Hotel address, price , Hotel image url, geo coordinates, rating descriptions and suggest itineary with placeName. Place detaisl ,place Image Url, Geo Coordinates, ticket Pricing. Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'