import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  confirmButtonColor?: string;
  onConfirm: () => void;
  onRequestClose?: () => void;
};

export default function CustomAlert({
  visible,
  title = "Notice",
  message = "",
  confirmText = "OK",
  confirmButtonColor = "#6a1b9a",
  onConfirm,
  onRequestClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose ?? onConfirm}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: confirmButtonColor }]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 320,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  message: { fontSize: 15, textAlign: "center", marginBottom: 14 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
