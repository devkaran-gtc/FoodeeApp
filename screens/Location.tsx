import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {showToast} from '../components/Toast';

const Location = () => {
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'auto',
      enableBackgroundLocationUpdates: true,
      locationProvider: 'auto',
    });
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      },
      error => {
        console.log(error);
        showToast("ensure that device's location is on");
      },
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
  }, []);

  console.log(region);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        mapType="satellite"
        showsUserLocation={true}>
        {/* <Marker
          coordinate={region}
          title="My Location"
          description="This is my current location"
        /> */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Location;
