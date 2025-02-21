### Weather Analytics Dashboard  

A sleek and interactive weather analytics dashboard that fetches real-time and forecasted weather data from the **OpenWeather API** and presents it with dynamic visualizations.  

---

## Live Demo
[Weather Analytics](https://weather-analytics-eight.vercel.app/)


---

## Features  

- **Search & Display**: Enter a city name to fetch and display its current weather data.  
- **Weather Details**: View temperature, humidity, wind speed, and other weather conditions.  
- **Interactive Charts**:  
  - Line Chart – Hourly temperature forecast for the next 24 hours.  
  - Bar Chart – Rain probability, humidity, and wind speed trends.  
  - Pie Chart – Breakdown of weather conditions over time.  
- **Weather History**: Store recent searches for quick access.  
- **Responsive Design**: Works seamlessly on desktop and mobile.   

---

## Tech Stack  

- **Frontend**: React 19 + Vite  
- **Styling**: SCSS Modules  
- **Charting Library**: *(Specify once chosen: Chart.js, Recharts, etc.)*  
- **API**: OpenWeather API  
- **Linting & Formatting**: ESLint  

---

## Installation & Setup  

### Clone the Repository  
```sh
git clone https://github.com/derekgygax/weather-analytics.git
cd weather-analytics
```

### Install Dependencies  
```sh
bun install
```

### Run the Development Server  
```sh
bun run dev
```

### Build for Production  
```sh
bun run build
```

---

## Environment Variables  

Create a `.env` file in the root directory and add your OpenWeather API key:  
```
OPENWEATHER_API_KEY=your_api_key_here
```

---

## Deployment  

To preview a local production build:  
```sh
bun run preview
```

---

## License  

This project is open-source and available under the [MIT License](LICENSE).