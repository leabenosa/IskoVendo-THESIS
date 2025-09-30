import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useProducts } from "../context/ProductContext";
import uuid from "react-native-uuid";
import CustomAlert from "../components/CustomAlert";



export default function AddProductScreen() {
  const { addProduct } = useProducts();

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");


  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.7,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const handleSave = () => {
    if (!name || !quantity) {
      setAlertType("error");
      setAlertMessage("Please enter at least a name and quantity.");
      setShowAlert(true);
      return;
    }

   const newProduct = {
  id: uuid.v4().toString(),
  name,
  price: Number(price) || 0,
  quantity: Number(quantity) || 0,
  date,
  image,
};


    addProduct(newProduct);

    setAlertType("success");
    setAlertMessage("Product Saved!");
    setShowAlert(true);

    // reset fields
    setImage(null);
    setName("");
    setPrice("");
    setQuantity("");
    setDate("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Upload */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>ADD IMAGES</Text>
        )}
      </TouchableOpacity>

      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price (₱)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 09-25-2025)"
        value={date}
        onChangeText={setDate}
      />

     
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>✔ SAVE PRODUCT</Text>
      </TouchableOpacity>

      
     <CustomAlert
  visible={showAlert}
  title={alertType === "error" ? "Error" : "Success"}
  message={alertMessage}
  confirmText="OK"
  confirmButtonColor={alertType === "error" ? "#ee0b0bff" : "#740c0cff"}
  onConfirm={() => setShowAlert(false)}
  onRequestClose={() => setShowAlert(false)}
/>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  imagePicker: {
    width: "100%",
    height: 150,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imageText: {
    fontSize: 16,
    color: "#777",
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  saveBtn: {
    backgroundColor: "#851c15ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  alertContainer: {
  width: 320,
  paddingHorizontal: 2,
  paddingVertical: 5,
  borderRadius: 10,
},
alertTitle: {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
},
alertMessage: {
  fontSize: 16,
  textAlign: "center",
  marginTop: 0,
},
});
