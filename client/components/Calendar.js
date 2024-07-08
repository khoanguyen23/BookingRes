import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

const Calendar = ({ setSelectedWeek, handleClosePress, resetTrigger }) => {
  const [internalSelectedWeek, setInternalSelectedWeek] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Thêm state để lưu ngày đã chọn

  useEffect(() => {
    if (resetTrigger) {
      clearSelection();
    }
  }, [resetTrigger]);

  const onDateChange = (date) => {
    setSelectedDate(date); // Cập nhật ngày đã chọn
    const startOfWeek = moment(date).startOf("isoWeek");
    const endOfWeek = moment(date).endOf("isoWeek");
    setInternalSelectedWeek({ startOfWeek, endOfWeek });
  };

  const clearSelection = () => {
    setInternalSelectedWeek(null);
    setSelectedDate(null); // Xóa ngày đã chọn
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
        selectedStartDate={selectedDate} // Thiết lập ngày đã chọn
        startFromMonday={true}
        todayBackgroundColor="#577B8D"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
      />

      <Text style={styles.text} className="text-red-700">
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
