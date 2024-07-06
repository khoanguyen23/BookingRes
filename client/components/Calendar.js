import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

const Calendar = ({ setSelectedWeek, handleClosePress }) => {
  const [internalSelectedWeek, setInternalSelectedWeek] = useState(null);

  const onDateChange = (date) => {
    const startOfWeek = moment(date).startOf("isoWeek");
    const endOfWeek = moment(date).endOf("isoWeek");
    setInternalSelectedWeek({ startOfWeek, endOfWeek });
  };

  const getCustomDatesStyles = (date) => {
    if (!internalSelectedWeek) return {};
    const { startOfWeek, endOfWeek } = internalSelectedWeek;

    if (moment(date).isBetween(startOfWeek, endOfWeek, null, "[]")) {
      return {
        style: styles.selectedDate,
        textStyle: styles.selectedDateText,
      };
    }
    return {};
  };

  const applySelection = () => {
    setSelectedWeek(internalSelectedWeek);
    handleClosePress();
  };

  return (
    <View className="mt-2">
      <CalendarPicker
        onDateChange={onDateChange}
        customDatesStyles={getCustomDatesStyles}
        startFromMonday={true}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
      />

      <Text style={styles.text}>
        {internalSelectedWeek
          ? `Tuần đã chọn: Từ ${internalSelectedWeek.startOfWeek.format(
              "DD/MM/YYYY"
            )} đến ${internalSelectedWeek.endOfWeek.format("DD/MM/YYYY")}`
          : "Chọn một ngày để chọn tuần"}
      </Text>

      <TouchableOpacity onPress={applySelection} className="p-4 border rounded-md mx-2 mt-4">
        <Text className="text-xl font-bold text-center">Apply</Text>
      </TouchableOpacity>
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
