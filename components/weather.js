import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { weatherConditions } from "../config/WeatherConditions";

// import { LineChart } from "react-native-charts-wrapper";

const Weather = ({ data, onPress }) => {
  console.log("data");
  console.log(data);
  if (data == null) return;
  var currentWeather = data.current;
  var weather = currentWeather.weather[0].main;
  var daily = data.daily;
  var hourly = data.hourly;
  var hourlyThird = [];
  for (var i = 0; i < hourly.length - 2; i = i + 3) hourlyThird.push(hourly[i]);
  var minutely = data.minutely;
  var currentDate = new Date(currentWeather.dt * 1000);
  var sunrise = new Date(currentWeather.sunrise * 1000);
  var sunset = new Date(currentWeather.sunset * 1000);

  return (
    <ScrollView style={[styles.weatherContainer, { backgroundColor: "#fff" }]}>
      <Button
        style={{
          flex: 2,
          height: 10,
          width: 10,
        }}
        solid
        title="Neu laden"
        onPress={onPress}
      ></Button>
      <Text>
        {padLeadingZeros(currentDate.getDate())}.
        {padLeadingZeros(currentDate.getMonth() + 1)}.
        {currentDate.getFullYear()} - {padLeadingZeros(currentDate.getHours())}:
        {padLeadingZeros(currentDate.getMinutes())}
      </Text>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            size={72}
            name={weatherConditions[weather].icon}
            color={"#000"}
          />
          <View
            style={{
              height: 8,
            }}
          />
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        </View>
        <Text style={styles.tempText}>{Math.round(currentWeather.temp)}˚C</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Icon size={24} name="sunrise" color={"#000"} />
        <Text>
          {padLeadingZeros(sunrise.getHours())}:
          {padLeadingZeros(sunrise.getMinutes())}{" "}
        </Text>
        <View
          style={{
            width: 16,
          }}
        />
        <Icon size={24} name="sunset" color={"#000"} />
        <Text>
          {padLeadingZeros(sunset.getHours())}:
          {padLeadingZeros(sunset.getMinutes())}
        </Text>
      </View>
      <View
        style={{
          height: 16,
        }}
      />
      <FlatList
        data={daily.slice(1, 8)}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {getGermanDay(new Date(item.dt * 1000).getDay())},{" "}
                {padLeadingZeros(new Date(item.dt * 1000).getDate())}.
                {padLeadingZeros(new Date(item.dt * 1000).getMonth() + 1)}
              </Text>
              <View
                style={{
                  width: 16,
                }}
              />
              <Icon size={24} name="sunrise" color={"#000"} />
              <Text>
                {padLeadingZeros(new Date(item.sunrise * 1000).getHours())}:
                {padLeadingZeros(new Date(item.sunrise * 1000).getMinutes())}
              </Text>
              <View
                style={{
                  width: 16,
                }}
              />
              <Icon size={24} name="sunset" color={"#000"} />
              <Text>
                {padLeadingZeros(new Date(item.sunset * 1000).getHours())}:
                {padLeadingZeros(new Date(item.sunset * 1000).getMinutes())}
              </Text>
            </View>
            <View style={{ height: 8 }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  size={24}
                  name={weatherConditions[item.weather[0].main].icon}
                  color={"#000"}
                />
                <View
                  style={{
                    height: 8,
                  }}
                />
                <Text>{weatherConditions[item.weather[0].main].title}</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Icon size={24} name="arrow-up" color={"#000"} />
                  <View
                    style={{
                      width: 8,
                    }}
                  />
                  <Text>{Math.round(item.temp.max)}˚C</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Icon size={24} name="arrow-down" color={"#000"} />
                  <View
                    style={{
                      width: 8,
                    }}
                  />
                  <Text>{Math.round(item.temp.min)}˚C</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                height: 16,
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          height: 16,
        }}
      />
      <FlatList
        data={hourlyThird}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              padding: 8,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                {getGermanDay(new Date(hourly[index * 3].dt * 1000).getDay())},{" "}
                {padLeadingZeros(
                  new Date(hourly[index * 3].dt * 1000).getHours()
                )}{" "}
                Uhr
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Icon
                  size={24}
                  name={
                    weatherConditions[hourly[index * 3].weather[0].main].icon
                  }
                  color={"#000"}
                />
                <View style={{ width: 4 }} />
                <Text>{Math.round(hourly[index * 3].temp)}˚C</Text>
              </View>

              <Text>
                {weatherConditions[hourly[index * 3].weather[0].main].title}
              </Text>
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text>
                {getGermanDay(
                  new Date(hourly[index * 3 + 1].dt * 1000).getDay()
                )}
                ,{" "}
                {padLeadingZeros(
                  new Date(hourly[index * 3 + 1].dt * 1000).getHours()
                )}{" "}
                Uhr
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Icon
                  size={24}
                  name={
                    weatherConditions[hourly[index * 3 + 1].weather[0].main]
                      .icon
                  }
                  color={"#000"}
                />
                <View style={{ width: 4 }} />
                <Text>{Math.round(hourly[index * 3 + 1].temp)}˚C</Text>
              </View>
              <Text>
                {weatherConditions[hourly[index * 3 + 1].weather[0].main].title}
              </Text>
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text>
                {getGermanDay(
                  new Date(hourly[index * 3 + 2].dt * 1000).getDay()
                )}
                ,{" "}
                {padLeadingZeros(
                  new Date(hourly[index * 3 + 2].dt * 1000).getHours()
                )}{" "}
                Uhr
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Icon
                  size={24}
                  name={
                    weatherConditions[hourly[index * +2].weather[0].main].icon
                  }
                  color={"#000"}
                />
                <View style={{ width: 4 }} />
                <Text>{Math.round(hourly[index * 3 + 2].temp)}˚C</Text>
              </View>
              <Text>
                {weatherConditions[hourly[index * 3 + 2].weather[0].main].title}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          height: 16,
        }}
      />
      <Text style={{ fontWeight: "bold" }}>
        Niederschlagswahrscheinlichkeit:
      </Text>
      {/* <LineChart
        style={styles.chart}
        data={{
          dataSets: [{ label: "demo", values: [{ y: 1 }, { y: 2 }, { y: 1 }] }],
        }}
      /> */}
      <FlatList
        data={minutely}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text>
              {padLeadingZeros(new Date(item.dt * 1000).getHours())}:
              {padLeadingZeros(new Date(item.dt * 1000).getMinutes())}{" "}
            </Text>
            <Text>{Math.round(item.precipitation * 100)}%</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

function getGermanDay(day) {
  switch (day) {
    case 1:
      return "Mo";
    case 2:
      return "Di";
    case 3:
      return "Mi";
    case 4:
      return "Do";
    case 5:
      return "Fr";
    case 6:
      return "Sa";
    case 0:
      return "So";
  }
}

function padLeadingZeros(num, size = 2) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

const styles = StyleSheet.create({
  weatherContainer: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "column",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  tempText: {
    fontSize: 64,
    color: "#000",
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    color: "#000",
    paddingTop: 8,
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default Weather;
