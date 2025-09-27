import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useProducts } from "../context/ProductContext"; // ✅ use hook instead
import { v4 as uuidv4 } from "uuid"; // make sure you installed uuid:  npm install uuid @types/uuid

export default function AddProductScreen() {
  const { addProduct } = useProducts(); // ✅ get addProduct from context

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [supplier, setSupplier] = useState("");
  const [description, setDescription] = useState("");

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
      Alert.alert("Error", "Please enter at least a name and quantity.");
      return;
    }

    const newProduct = {
      id: uuidv4(),
      name,
      price,
      quantity: Number(quantity),
      date,
      supplier,
      description,
      image,
    };

    addProduct(newProduct); // ✅ add to context

    Alert.alert("Success", "Product Saved!");

    // ✅ Reset form fields after save
    setImage(null);
    setName("");
    setPrice("");
    setQuantity("");
    setDate("");
    setSupplier("");
    setDescription("");
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
        placeholder="Date (e.g., 2025-09-25)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Supplier"
        value={supplier}
        onChangeText={setSupplier}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>✔ SAVE PRODUCT</Text>
      </TouchableOpacity>
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: "#6a1b9a",
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
});
