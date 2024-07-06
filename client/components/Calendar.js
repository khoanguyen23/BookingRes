import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

const Calendar = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);

  const onDateChange = (date) => {
    const startOfWeek = moment(date).startOf("isoWeek");
    const endOfWeek = moment(date).endOf("isoWeek");
    setSelectedWeek({ startOfWeek, endOfWeek });
  };

  const getCustomDatesStyles = (date) => {
    if (!selectedWeek) return {};
    const { startOfWeek, endOfWeek } = selectedWeek;

    if (moment(date).isBetween(startOfWeek, endOfWeek, null, "[]")) {
      return {
        style: styles.selectedDate,
        textStyle: styles.selectedDateText,
      };
    }
    return {};
  };

  return (
    <View className='mt-2'>
      <CalendarPicker
        onDateChange={onDateChange}
        customDatesStyles={getCustomDatesStyles}
        startFromMonday={true}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
      />

      <Text style={styles.text}>
        {selectedWeek
          ? `Tuần đã chọn: Từ ${selectedWeek.startOfWeek.format(
              "DD/MM/YYYY"
            )} đến ${selectedWeek.endOfWeek.format("DD/MM/YYYY")}`
          : "Chọn một ngày để chọn tuần"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  selectedDate: {
    backgroundColor: "#ffccff",
  },
  selectedDateText: {
    color: "#000",
  },
});

export default Calendar;
