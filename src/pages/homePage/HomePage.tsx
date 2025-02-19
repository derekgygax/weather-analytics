// layouts
import { CurrentWeather } from "../../components/currentWeather/CurrentWeather";
import { PageSection } from "../../layouts/pageSection/PageSection";
import { Weather } from "../../types/weatherTypes";

interface HomePageProps {
  weather: Weather;
}

export const HomePage = ({ weather }: HomePageProps) => {
  console.log(weather);

  return (
    <main>
      <PageSection>
        <CurrentWeather
          weather={weather.current ?? { city: "abal", weather: {} }}
        />
      </PageSection>
    </main>
  )
}
