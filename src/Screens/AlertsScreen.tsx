import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../../supabaseClient';

// Define the Alert type
interface Alert {
  id: string;
  product_id: string;
  alert_type: string;
  message?: string;
  timestamp: string;
}

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Fetch initial alerts
    fetchAlerts();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('public:alerts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'alerts' },
        (payload) => {
          console.log('New alert received!', payload.new);
          setAlerts((prev) => [payload.new as Alert, ...prev]);
        }
      )
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Fetch alerts from Supabase
  const fetchAlerts = async () => {
    const { data, error } = await supabase
      .from('alerts')
.select('*')
.order('timestamp', { ascending: false });


    if (error) {
      console.log('Error fetching alerts:', error);
    } else if (data) {
      setAlerts(data);
    }
  };

  // Render each alert
  const renderAlert = ({ item }: { item: Alert }) => (
    <View style={styles.alertItem}>
      <Text>Product ID: {item.product_id}</Text>
      <Text>Type: {item.alert_type}</Text>
      {item.message && <Text>Message: {item.message}</Text>}
      <Text>Time: {item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={renderAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  alertItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});
