/* libs */
import React from 'react';
import { StyleSheet, View } from 'react-native';

/* components */
import Text from '@components/Text';

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 17
  },
  textDescription: {
    marginTop: 15,
    fontSize: 15
  }
});

const Header = ({ title, description, style }) => (
  <View style={style}>
    <Text bold style={styles.textHeader}>
      {title}
    </Text>
    <Text style={styles.textDescription}>{description}</Text>
  </View>
);

export default Header;
