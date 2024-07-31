// import React from 'react'

// export const ChatInputText = () => {
//   return (
//     <View
//         style={{
//           flexDirection: 'row',
//           gap: 10,
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: width - 60,
//         }}>
//         <TextInput
//           onChangeText={setPrompt}
//           placeholderTextColor={
//             !isDarkMode
//               ? globalColors.neutralColors.placeholderColor
//               : globalColors.neutralColors.placeholderColorDark
//           }
//           style={{
//             flex: 1,
//             paddingHorizontal: 20,
//             backgroundColor: !isDarkMode
//               ? globalColors.neutralColors.textInputBackground
//               : globalColors.neutralColors.textInputBackgroundDark,
//             borderRadius: globalDimensions.borderRadiusButtom,
//           }}
//           placeholder="Escribe un mensaje..."
//         />

//         <TouchableOpacity
//           disabled={loadingAnswer || prompt.length === 0}
//           onPress={handleSendMessage}
//           style={{
//             height: 55,
//             width: 55,
//             backgroundColor:
//               !loadingAnswer && prompt.length > 0
//                 ? globalColors.primaryColors.primary
//                 : isDarkMode
//                 ? globalColors.neutralColors.backgroundDarkAlpha
//                 : globalColors.neutralColors.borderDark,
//             borderRadius: 100,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <CustomIcon
//             white={isDarkMode ? false : true}
//             name="paper-plane-outline"
//           />
//         </TouchableOpacity>
//       </View>
//   )
// }
