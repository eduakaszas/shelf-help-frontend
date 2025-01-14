import { useState } from 'react';
import { Modal, View, TextInput, Button, StyleProp, ViewStyle, TextStyle, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { CreateItemDTO } from '../types/Item';

interface AddItemModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (itemData: CreateItemDTO) => Promise<void>;
};

interface ItemFormData {
    name: string;
    count: number;
    expirationDate: string | null;
}

interface Styles {
    modalTitle: StyleProp<TextStyle>;
    input: StyleProp<TextStyle>;
    modalButtons: StyleProp<ViewStyle>;
    modalContent: StyleProp<ViewStyle>;
    modalContainer: StyleProp<ViewStyle>;
}

const AddItemModal = ({ visible, onClose, onSubmit }) => {
    const [itemData, setItemData] = useState<ItemFormData>({
        name: '',
        count: 0,
        expirationDate: null,
    });

    const handleSubmit = async () => {
        if (!itemData.name) return;

        await onSubmit(itemData);

        setItemData({
            name: '',
            count: 0,
            expirationDate: null,
        });

        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            // onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add new item</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={itemData.name}
                        onChangeText={(text) => setItemData({ ...itemData, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Count"
                        value={itemData.count.toString()}
                        onChangeText={(text) => setItemData({ ...itemData, count: Number(text) })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Expiration date"
                        value={itemData.expirationDate || ''}
                        onChangeText={(text) => setItemData({ ...itemData, expirationDate: text })}
                    />
                    <View style={styles.modalButtons}>
                        <Button title="Cancel" onPress={onClose} />
                        <Button title="Add" onPress={handleSubmit} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles: Styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})

export default AddItemModal;

