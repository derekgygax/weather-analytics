// layouts
import { PageSection } from "../../layouts/pageSection/PageSection";
import { Weather } from "../../types/weatherTypes";

interface HomePageProps {
  weather: Weather;
}

export const HomePage = ({ weather }: HomePageProps) => {

  return (
    <main>
      <PageSection>
        <div>{weather.current?.city}</div>
      </PageSection>
      <PageSection>
        <h1>OLD</h1>
        {Object.entries(weather.searchHistory).map(([key, value]) => {
          return (<div>{key}{value.city}</div>)
        })}
      </PageSection>
    </main>
  )
}
