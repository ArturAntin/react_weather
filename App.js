import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { API_KEY } from "./config/WeatherAPI";
import Weather from "./components/weather";
import Geolocation from "@react-native-community/geolocation";

export default class App extends React.Component {
  state = {
    isLoading: true,
    data: null,
    error: null,
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this.setState({
          error: "Error Getting Weather Condtions ${error}",
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    this.setState({
      isLoading: true,
      data: null,
    });
    if (lat == null || lon == null) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.fetchWeather(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          this.setState({
            error: "Error Getting Weather Condtions ${error}",
          });
        }
      );
      return;
    }

    fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Wetterdaten laden...</Text>
          </View>
        ) : (
          <Weather data={this.state.data} onPress={() => this.fetchWeather()} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDE4",
  },
  loadingText: {
    fontSize: 30,
  },
});
