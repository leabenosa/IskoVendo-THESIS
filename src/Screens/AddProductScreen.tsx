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
import { supabase } from "../../supabaseClient";
import CustomAlert from "../components/CustomAlert";

export default function AddProductScreen() {
  const { addProduct } = useProducts();

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("5");

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("success");
  const [alertMessage, setAlertMessage] = useState("");

  // Pick image from library
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.7,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  // Upload image to Supabase storage
  const uploadImage = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = `product-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filename, blob);

      if (uploadError) throw uploadError;

      const { data: publicData, error: publicError } = supabase.storage
        .from("product-images")
        .getPublicUrl(filename);

      if (publicError) throw publicError;

      return publicData?.publicUrl || null;
    } catch (err) {
      console.log("Image upload error:", err);
      return null;
    }
  };

  // Save product handler
  const handleSave = async () => {
    if (!name || !quantity) {
      setAlertType("error");
      setAlertMessage("Please enter at least a name and quantity.");
      setShowAlert(true);
      return;
    }

    try {
      // Upload image if selected
      const imageUrl = image ? await uploadImage(image) : null;

      // Insert product into 'products' table
      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([{ name, price: Number(price) || 0, image: imageUrl }])
        .select()
        .single();

      if (productError) throw productError;

      const productId = productData.id;

      // ✅ Correct usage: addProduct with 3 separate arguments
      await addProduct(
        productId,
        Number(quantity) || 0,
        Number(lowStockThreshold) || 5
      );

      setAlertType("success");
      setAlertMessage("Product saved successfully!");
      setShowAlert(true);

      // Reset form
      setImage(null);
      setName("");
      setPrice("");
      setQuantity("");
      setLowStockThreshold("5");
    } catch (err: any) {
      setAlertType("error");
      setAlertMessage(err.message || "Error saving product.");
      setShowAlert(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Upload */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>ADD IMAGE</Text>
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
        placeholder="Low Stock Threshold"
        keyboardType="numeric"
        value={lowStockThreshold}
        onChangeText={setLowStockThreshold}
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
});
