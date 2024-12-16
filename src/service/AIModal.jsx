
  import{GoogleGenerativeAI} from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a plan for Location: Las Vegas for 3 days,for couple with a cheap budget. Give me a hotels option list with Hotelname,Hotel address, price , Hotel image url, geo coordinates, rating descriptions and suggest itineary with placeName. Place detaisl ,place Image Url, Geo Coordinates, ticket Pricing. Time travel each of the location for 3 days with each day plan with best time to visit in JSON format\n\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly provide hotel images, URLs, or real-time pricing as that data changes frequently and requires access to external APIs.  I also can't guarantee the accuracy of real-time ticket pricing.  However, I can give you a JSON structure with placeholders for that information, and suggest locations and a budget-friendly itinerary.  You will need to use a travel website or booking site to fill in the missing details.\n\n\n```json\n{\n  \"tripName\": \"Las Vegas Budget Trip for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1 (Example: Circus Circus)\",\n      \"hotelAddress\": \"Address 1 (Example: 2880 Las Vegas Blvd S, Las Vegas, NV 89109)\",\n      \"priceRange\": \"$50-$100/night (Example)\",\n      \"hotelImageUrl\": \"URL Placeholder 1\", \n      \"geoCoordinates\": {\"lat\": 36.1215, \"lng\": -115.1739},  // Example coordinates\n      \"rating\": \"3.5 stars (Example)\",\n      \"ratingDescription\": \"Decent value for the price, good location\" \n    },\n    {\n      \"hotelName\": \"Hotel Name 2 (Example: Motel 6)\",\n      \"hotelAddress\": \"Address 2 (Example:  3155 S Las Vegas Blvd, Las Vegas, NV 89109)\",\n      \"priceRange\": \"$40-$80/night (Example)\",\n      \"hotelImageUrl\": \"URL Placeholder 2\",\n      \"geoCoordinates\": {\"lat\": 36.104, \"lng\": -115.169}, //Example Coordinates\n      \"rating\": \"3 stars (Example)\",\n      \"ratingDescription\": \"Basic but clean and affordable\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 3 (Example:  Budget-friendly hotel near the Strip)\",\n      \"hotelAddress\": \"Address 3 (Example:  Find one near the Strip)\",\n      \"priceRange\": \"$60-$120/night (Example)\",\n      \"hotelImageUrl\": \"URL Placeholder 3\",\n      \"geoCoordinates\": {\"lat\": 36.11, \"lng\": -115.17}, //Example coordinates\n      \"rating\": \"3.8 stars (Example)\",\n      \"ratingDescription\": \"Good value and convenient location\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"date\": \"YYYY-MM-DD\",\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Free walking area with light shows, street performers, and casinos.\",\n          \"placeImageUrl\": \"URL Placeholder\",\n          \"geoCoordinates\": {\"lat\": 36.1699, \"lng\": -115.1403},\n          \"ticketPricing\": \"Free\",\n          \"timeToVisit\": \"Evening (for the light shows)\"\n        },\n        {\n          \"placeName\": \"Pinball Hall of Fame\",\n          \"placeDetails\": \"Huge collection of pinball machines.\",\n          \"placeImageUrl\": \"URL Placeholder\",\n          \"geoCoordinates\": {\"lat\": 36.1062, \"lng\": -115.1478},\n          \"ticketPricing\": \"$15 (Example)\",\n          \"timeToVisit\": \"Afternoon\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"date\": \"YYYY-MM-DD\",\n      \"plan\": [\n        {\n          \"placeName\": \"Seven Magic Mountains\",\n          \"placeDetails\": \"Colorful art installation outside of the city (requires transportation).\",\n          \"placeImageUrl\": \"URL Placeholder\",\n          \"geoCoordinates\": {\"lat\": 36.0706, \"lng\": -114.9858},\n          \"ticketPricing\": \"Free\",\n          \"timeToVisit\": \"Afternoon\"\n        },\n          {\n          \"placeName\": \"The Strip (walking)\",\n          \"placeDetails\": \"Walk portions of the Strip, enjoying the sights and sounds.  Look for free shows and events.\",\n          \"placeImageUrl\": \"URL Placeholder\",\n          \"geoCoordinates\": {\"lat\": 36.1135, \"lng\": -115.1728},\n          \"ticketPricing\": \"Free\",\n          \"timeToVisit\": \"Morning and early evening\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"date\": \"YYYY-MM-DD\",\n      \"plan\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area (Hike)\",\n          \"placeDetails\": \"Beautiful scenery for hiking (rental car recommended).\",\n          \"placeImageUrl\": \"URL Placeholder\",\n          \"geoCoordinates\": {\"lat\": 36.2202, \"lng\": -115.7451},\n          \"ticketPricing\": \"$15 per vehicle (Example)\",\n          \"timeToVisit\": \"Morning\"\n        },\n        {\n          \"placeName\": \"Valley of Fire State Park (Optional, if time allows)\",\n          \"placeDetails\": \"Another scenic area, but further out (rental car recommended).\",\n          \"placeImageUrl\": \"URL Placeholder\",\n          \"geoCoordinates\": {\"lat\": 36.3873, \"lng\": -114.9048},\n          \"ticketPricing\": \"$10 per vehicle (Example)\",\n          \"timeToVisit\": \"Late Morning/Early Afternoon\"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Remember to:**\n\n* **Research and book your hotel in advance,** especially if traveling during peak season. Websites like Booking.com, Expedia, and Kayak can help compare prices.\n* **Factor in transportation costs.** Walking is great for the Strip, but you might need a rideshare or public transport for some locations.  Renting a car might be worthwhile if you plan on visiting Red Rock Canyon or Valley of Fire.\n* **Look for free activities:** Las Vegas offers plenty of free entertainment, like the Bellagio fountains and the Volcano at the Mirage.\n* **Pack snacks and water:** This will help you save money on food and drinks.\n* **Utilize happy hour deals:**  Many bars and restaurants offer discounted food and drinks during happy hour.\n\n\nThis JSON structure provides a framework.  You'll need to fill in the missing data using online resources to create your complete and personalized Las Vegas itinerary.  Enjoy your trip!\n"},
          ],
        },
      ],
    });
  
    
  
  
  