import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Menu = () => {
  return (
    <View className="flex flex-row pb-10 border-b-[1px] border-b-[#B7B7B7] w-[95%] mt-2">
      <View className="mr-2">
        <Image
          style={{ width: 110, height: 110, borderRadius: 8 }}
          source={{
            uri: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870",
          }}
        />
        <View className="mt-2">
        <TouchableOpacity>
            <Text className="text-center p-1 border-[#BF3431] border rounded-sm text-[#BF3431]">
              bán chạy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-60">
        <Text className="text-lg font-bold mt-1.5">Suất Buffet Wakana T2-CN, Giá 439k - Anrakutei Mạc Đĩnh Chi</Text>
        <Text className="mt-1.5 text-gray-500">81 món: Ba chỉ bò, Ba chỉ heo, Bạch tuộc, Mực, Mà Đùi gà, cuống tim bò</Text>
        <Text className="mt-1.5 text-[#E15241] font-normal text-base">439k</Text>
        <Text>Combo thuyền các loại thịt đặc trưng</Text>
        <Text className="text-sky-500 underline">Quy định & điều kiện sử dụng sản phẩm này</Text>
        <View className="mt-2 ">
          <TouchableOpacity>
            <Text className="w-full text-center p-1 border-[#BF3431] border rounded-sm text-[#BF3431]">
              Chọn ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Menu;

{/* <View className="flex p-6 bg-white mt-2">
<Text className="text-lg font-semibold">Đề xuất</Text>
<Text className="text-lg font-semibold mt-2">
  Các xuất Buffet Nướng Lẩu Nhật Bản Menu Đa Dạng, Hấp dẫn
</Text>
</View> */}
